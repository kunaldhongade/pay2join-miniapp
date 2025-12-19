import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import { openLink } from '@tma.js/sdk-react';
import { toNano } from '@ton/core';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';
import { Page } from '@/components/Page.tsx';
import { bem } from '@/css/bem.ts';
import { PAY2JOIN_DEFAULT_PRICE_TON, buildBuyAccessPayloadBase64 } from '@/ton/pay2Join';

import './TONConnectPage.css';

const [, e] = bem('ton-connect-page');

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
    // Basic sanity only (wallet will validate for real).
    // Accept raw format "0:..." or user-friendly "EQ..." / "kQ...".
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
      const queryId = BigInt(Date.now()); // simple unique value
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
        <Placeholder
          className={e('placeholder')}
          header="TON Connect"
          description={
            <>
              <Text>
                To display the data related to the TON Connect, it is required to connect your
                wallet
              </Text>
              <TonConnectButton className={e('button')} />
            </>
          }
        />
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
                <Title level="3">{wallet.name}</Title>
              </Cell>
            </Section>
            <TonConnectButton className={e('button-connected')} />
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
            <div className={e('header-wrapper')}>
              <div className={e('header-icon')}>🔐</div>
              <div>
                <Title level="2" className={e('header-title')}>Pay2Join</Title>
                <Text className={e('header-subtitle')}>Unlock premium access</Text>
              </div>
            </div>
          }
        >
          <div className={e('pay2join')}>
            <div className={e('card')}>
              <div className={e('card-header')}>
                <div className={e('price-badge')}>
                  <span className={e('price-amount')}>{PAY2JOIN_DEFAULT_PRICE_TON}</span>
                  <span className={e('price-currency')}>TON</span>
                </div>
                <Text className={e('card-description')}>
                  Pay once to unlock access for 30 days
                </Text>
              </div>

              <div className={e('input-group')}>
                <label className={e('label')}>
                  <Text className={e('label-text')}>Contract Address</Text>
                  <input
                    className={e('input')}
                    value={contractAddress}
                    onChange={(ev) => setContractAddress(ev.target.value)}
                    placeholder="EQ... or 0:..."
                  />
                </label>

                {!contractAddressLooksValid && contractAddress.length > 0 && (
                  <div className={e('hint-box')}>
                    <Text className={e('hint')}>
                      ⚠️ Please enter a valid contract address
                    </Text>
                  </div>
                )}
              </div>

              <button
                className={e('pay-button', { disabled: !contractAddressLooksValid || isPaying })}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!isPaying && contractAddressLooksValid) void onPayToJoin();
                }}
                disabled={!contractAddressLooksValid || isPaying}
              >
                {isPaying ? (
                  <>
                    <span className={e('spinner')}></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className={e('button-icon')}>💎</span>
                    Pay {PAY2JOIN_DEFAULT_PRICE_TON} TON to Join
                  </>
                )}
              </button>

              {payOk && (
                <div className={e('status-box', { success: true })}>
                  <Text className={e('status-text')}>✅ {payOk}</Text>
                </div>
              )}
              {payError && (
                <div className={e('status-box', { error: true })}>
                  <Text className={e('status-text')}>❌ {payError}</Text>
                </div>
              )}
            </div>
          </div>
        </Section>
      </List>
    </Page>
  );
};
