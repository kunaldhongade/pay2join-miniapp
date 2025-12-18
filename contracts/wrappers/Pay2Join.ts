import {
    Address,
    beginCell,
    Cell,
    Contract,
    ContractABI,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode
} from '@ton/core';

export type Pay2JoinConfig = {};

export function pay2JoinConfigToCell(config: Pay2JoinConfig): Cell {
    return beginCell().endCell();
}

export class Pay2Join implements Contract {
    abi: ContractABI = { name: 'Pay2Join' }

    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

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
}
