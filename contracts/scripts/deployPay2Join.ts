import { toNano } from '@ton/core';
import { Pay2Join } from '../wrappers/Pay2Join';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const pay2Join = provider.open(Pay2Join.createFromConfig({}, await compile('Pay2Join')));

    await pay2Join.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(pay2Join.address);

    // run methods on `pay2Join`
}
