import {
    Address,
    beginCell,
    Cell,
    Contract,
    ContractABI,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
} from '@ton/core';

export type Pay2JoinConfig = {
    owner: Address;
    price: bigint; // nanotoncoins
    accessDurationSec: number;
};

export function pay2JoinConfigToCell(config: Pay2JoinConfig): Cell {
    return (
        beginCell()
            .storeAddress(config.owner)
            .storeCoins(config.price)
            .storeUint(config.accessDurationSec, 32)
            // Storage.accessUntil: empty map => "no dict" => single 0 bit
            .storeDict(null)
            .endCell()
    );
}

export class Pay2Join implements Contract {
    abi: ContractABI = { name: 'Pay2Join' };

    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell },
    ) {}

    static createFromAddress(address: Address) {
        return new Pay2Join(address);
    }

    static createFromConfig(config: Pay2JoinConfig, code: Cell, workchain = 0) {
        const data = pay2JoinConfigToCell(config);
        const init = { code, data };
        return new Pay2Join(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    // 0x4f0b7a11 BuyAccess { queryId:uint64 }
    async sendBuyAccess(provider: ContractProvider, via: Sender, value: bigint, queryId: bigint = 0n) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0x4f0b7a11, 32).storeUint(queryId, 64).endCell(),
        });
    }

    // 0x0f6d8bb3 Withdraw { queryId:uint64 amount:coins }
    async sendWithdraw(provider: ContractProvider, via: Sender, amount: bigint, queryId: bigint = 0n) {
        await provider.internal(via, {
            value: 0n,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0x0f6d8bb3, 32).storeUint(queryId, 64).storeCoins(amount).endCell(),
        });
    }

    async getOwner(provider: ContractProvider) {
        const res = await provider.get('getOwner', []);
        return res.stack.readAddress();
    }

    async getPrice(provider: ContractProvider) {
        const res = await provider.get('getPrice', []);
        return res.stack.readBigNumber();
    }

    async getAccessUntil(provider: ContractProvider, user: Address) {
        const res = await provider.get('getAccessUntil', [
            { type: 'slice', cell: beginCell().storeAddress(user).endCell() },
        ]);
        return res.stack.readNumber();
    }

    async hasAccess(provider: ContractProvider, user: Address) {
        const res = await provider.get('hasAccess', [
            { type: 'slice', cell: beginCell().storeAddress(user).endCell() },
        ]);
        return res.stack.readBoolean();
    }
}
