import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Pay2Join } from '../wrappers/Pay2Join';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Pay2Join', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Pay2Join');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pay2Join: SandboxContract<Pay2Join>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        pay2Join = blockchain.openContract(Pay2Join.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

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
});
