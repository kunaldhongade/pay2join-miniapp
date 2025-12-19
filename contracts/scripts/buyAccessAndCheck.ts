import { NetworkProvider } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { Pay2Join } from '../wrappers/Pay2Join';

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function run(provider: NetworkProvider, args: string[]) {
    const addr = args[0];
    if (!addr) {
        throw new Error(
            'Usage: blueprint run buyAccessAndCheck --testnet --tonconnect <kQASvSNSo9jP9f8bgk9jGdLBcCJPFeJmb0JsOTBkbhRiVvpx>',
        );
    }

    const pay2Join = provider.open(Pay2Join.createFromAddress(Address.parse(addr)));
    const user = provider.sender().address!;

    const price = await pay2Join.getPrice();
    const before = await pay2Join.getAccessUntil(user);

    console.log('Pay2Join:', pay2Join.address.toString());
    console.log('User:', user.toString());
    console.log('Price (nano):', price.toString());
    console.log('AccessUntil before:', before);

    console.log('Sending BuyAccess tx. Approve in your wallet...');
    await pay2Join.sendBuyAccess(provider.sender(), toNano('0.5'));

    // Poll for state update
    for (let i = 1; i <= 15; i++) {
        await sleep(2000);
        const cur = await pay2Join.getAccessUntil(user);
        console.log(`AccessUntil after [${i}/15]:`, cur);
        if (cur > before) {
            console.log('✅ Access updated');
            return;
        }
    }

    console.log('⚠️ Did not observe access update yet (may be delayed).');
}
