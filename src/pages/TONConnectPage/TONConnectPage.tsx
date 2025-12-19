import { Avatar, Cell, List, Navigation, Section } from '@telegram-apps/telegram-ui';
import { openLink } from '@tma.js/sdk-react';
import { toNano } from '@ton/core';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';
import { Page } from '@/components/Page.tsx';
import { cn } from '@/lib/utils';
import { PAY2JOIN_DEFAULT_PRICE_TON, buildBuyAccessPayloadBase64 } from '@/ton/pay2Join';

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const [contractAddress, setContractAddress] = useState<string>(
    (import.meta.env.VITE_PAY2JOIN_ADDRESS as string | undefined) ?? '',
  );
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [payOk, setPayOk] = useState<string | null>(null);

  const contractAddressLooksValid = useMemo(() => {
    const s = contractAddress.trim();
    return s.length > 10;
  }, [contractAddress]);

  async function onPayToJoin() {
    setPayError(null);
    setPayOk(null);

    const addr = contractAddress.trim();
    if (!addr) {
      setPayError('Please paste the deployed Pay2Join contract address first.');
      return;
    }

    setIsPaying(true);
    try {
      const queryId = BigInt(Date.now());
      const payload = buildBuyAccessPayloadBase64(queryId);

      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 5 * 60,
        messages: [
          {
            address: addr,
            amount: toNano(PAY2JOIN_DEFAULT_PRICE_TON).toString(),
            payload,
          },
        ],
      });

      setPayOk(`Transaction sent. QueryId: ${queryId.toString()}`);
    } catch (err) {
      setPayError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsPaying(false);
    }
  }

  if (!wallet) {
    return (
      <Page>
        <div className="flex min-h-[calc(100dvh-100px)] items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-md rounded-3xl bg-gray-900/90 p-8 sm:p-10 text-center shadow-telegram-lg backdrop-blur-sm border border-gray-700/50">
            <div className="mb-6 text-6xl animate-pulse-slow">🔗</div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Connect Your Wallet
            </h2>
            <p className="mb-8 text-gray-400 leading-relaxed">
              Connect your TON wallet to start using Pay2Join and unlock premium content
            </p>
            <div className="flex justify-center">
              <TonConnectButton />
            </div>
          </div>
        </div>
      </Page>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;

  return (
    <Page>
      <List>
        {'imageUrl' in wallet && (
          <>
            <Section>
              <Cell
                before={
                  <Avatar src={wallet.imageUrl} alt="Provider logo" width={60} height={60} />
                }
                after={<Navigation>About wallet</Navigation>}
                subtitle={wallet.appName}
                onClick={(e) => {
                  e.preventDefault();
                  openLink(wallet.aboutUrl);
                }}
              >
                <div className="text-lg font-semibold">{wallet.name}</div>
              </Cell>
            </Section>
            <div className="px-4 pb-2">
              <TonConnectButton />
            </div>
          </>
        )}
        <DisplayData
          header="Account"
          rows={[
            { title: 'Address', value: address },
            { title: 'Chain', value: chain },
            { title: 'Public Key', value: publicKey },
          ]}
        />
        <DisplayData
          header="Device"
          rows={[
            { title: 'App Name', value: appName },
            { title: 'App Version', value: appVersion },
            { title: 'Max Protocol Version', value: maxProtocolVersion },
            { title: 'Platform', value: platform },
            {
              title: 'Features',
              value: features
                .map(f => typeof f === 'object' ? f.name : undefined)
                .filter(v => v)
                .join(', '),
            },
          ]}
        />

        <Section
          header={
            <div className="flex items-center gap-3 py-2">
              <div className="text-3xl">🔐</div>
              <div>
                <h2 className="text-xl font-bold text-white">Pay2Join</h2>
                <p className="text-sm text-gray-400 mt-0.5">Unlock premium access</p>
              </div>
            </div>
          }
        >
          <div className="p-4 sm:p-6">
            <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 shadow-telegram-lg border border-gray-200/50 dark:border-gray-700/50">
              {/* Price Badge */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="inline-flex items-baseline gap-2 bg-gradient-to-r from-telegram-blue to-telegram-blue-dark text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl shadow-lg mb-4">
                  <span className="text-3xl sm:text-4xl font-bold leading-none">
                    {PAY2JOIN_DEFAULT_PRICE_TON}
                  </span>
                  <span className="text-lg sm:text-xl font-semibold opacity-90">TON</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3">
                  Pay once to unlock access for 30 days
                </p>
              </div>

              {/* Contract Address Input */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Contract Address
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(ev) => setContractAddress(ev.target.value)}
                  placeholder="EQ... or 0:..."
                  className={cn(
                    "w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200",
                    "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                    "border-gray-200 dark:border-gray-700",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                    "font-mono text-sm sm:text-base",
                    "focus:outline-none focus:border-telegram-blue focus:ring-4 focus:ring-telegram-blue/10",
                    contractAddress && !contractAddressLooksValid && "border-amber-300 dark:border-amber-600"
                  )}
                />
                {contractAddress && !contractAddressLooksValid && (
                  <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400">
                      ⚠️ Please enter a valid contract address
                    </p>
                  </div>
                )}
              </div>

              {/* Pay Button */}
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!isPaying && contractAddressLooksValid) void onPayToJoin();
                }}
                disabled={!contractAddressLooksValid || isPaying}
                className={cn(
                  "w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg",
                  "bg-gradient-to-r from-telegram-blue to-telegram-blue-dark text-white",
                  "shadow-lg shadow-telegram-blue/40",
                  "transition-all duration-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                  "active:scale-[0.98]",
                  "flex items-center justify-center gap-2",
                  "min-h-[52px] sm:min-h-[56px]",
                  !isPaying && contractAddressLooksValid && "hover:shadow-xl hover:shadow-telegram-blue/50 hover:-translate-y-0.5"
                )}
              >
                {isPaying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">💎</span>
                    <span>Pay {PAY2JOIN_DEFAULT_PRICE_TON} TON to Join</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {payOk && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-in slide-in-from-top-2">
                  <p className="text-sm sm:text-base text-green-700 dark:text-green-400 break-words">
                    ✅ {payOk}
                  </p>
                </div>
              )}
              {payError && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-in slide-in-from-top-2">
                  <p className="text-sm sm:text-base text-red-700 dark:text-red-400 break-words">
                    ❌ {payError}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Section>
      </List>
    </Page>
  );
};
