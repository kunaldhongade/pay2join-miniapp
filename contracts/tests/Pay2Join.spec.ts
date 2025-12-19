import { compile } from '@ton/blueprint';
import { Cell, toNano } from '@ton/core';
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import '@ton/test-utils';
import { Pay2Join } from '../wrappers/Pay2Join';

describe('Pay2Join', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Pay2Join');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let alice: SandboxContract<TreasuryContract>;
    let pay2Join: SandboxContract<Pay2Join>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');
        alice = await blockchain.treasury('alice');

        pay2Join = blockchain.openContract(
            Pay2Join.createFromConfig(
                {
                    owner: deployer.address,
                    price: toNano('0.5'),
                    accessDurationSec: 30 * 24 * 60 * 60,
                },
                code,
            ),
        );

        const deployResult = await pay2Join.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pay2Join.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pay2Join are ready to use
    });

    it('should grant access after BuyAccess payment', async () => {
        const buy = await pay2Join.sendBuyAccess(alice.getSender(), toNano('0.5'));

        expect(buy.transactions).toHaveTransaction({
            from: alice.address,
            to: pay2Join.address,
            success: true,
        });

        const until = await pay2Join.getAccessUntil(alice.address);
        expect(until).toBeGreaterThan(0);
    });

    it('should not allow non-owner to withdraw', async () => {
        const res = await pay2Join.sendWithdraw(alice.getSender(), toNano('0.01'));
        expect(res.transactions).toHaveTransaction({
            from: alice.address,
            to: pay2Join.address,
            success: false,
        });
    });
});
