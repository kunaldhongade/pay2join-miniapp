import { compile, NetworkProvider } from '@ton/blueprint';
import { toNano } from '@ton/core';
import { Pay2Join } from '../wrappers/Pay2Join';

export async function run(provider: NetworkProvider) {
    // Defaults for demo purposes
    const owner = provider.sender().address!;
    const price = toNano('0.5');
    const accessDurationSec = 30 * 24 * 60 * 60; // 30 days

    const pay2Join = provider.open(
        Pay2Join.createFromConfig(
            {
                owner,
                price,
                accessDurationSec,
            },
            await compile('Pay2Join'),
        ),
    );

    await pay2Join.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(pay2Join.address);

    // run methods on `pay2Join`
}
