import { Cell, Image, List, Section } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import tonSvg from './ton.svg';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      {/* Hero Section */}
      <div className="text-center px-4 sm:px-6 py-10 sm:py-12 bg-gradient-to-br from-telegram-blue/20 via-telegram-blue/10 to-transparent rounded-b-3xl mb-6">
        <div className="text-5xl sm:text-6xl mb-4 animate-float">💎</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-telegram-blue to-telegram-blue-dark bg-clip-text text-transparent">
          Pay2Join
        </h1>
        <p className="text-base sm:text-lg text-gray-400 font-medium">
          Unlock premium content with TON
        </p>
      </div>

      <List>
        <Section
          header={
            <div className="py-2">
              <h2 className="text-xl font-bold text-white">Get Started</h2>
            </div>
          }
        >
          <Link to="/ton-connect">
            <Cell
              before={
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-telegram-blue to-telegram-blue-dark flex items-center justify-center p-2 shadow-lg shadow-telegram-blue/30">
                  <Image src={tonSvg} style={{ width: '100%', height: '100%' }} />
                </div>
              }
              subtitle="Connect your TON wallet and start using Pay2Join"
              className="rounded-2xl my-2 transition-transform active:scale-[0.98] min-h-[72px]"
            >
              <div className="text-lg font-semibold">Connect Wallet</div>
            </Cell>
          </Link>
        </Section>

      </List>
    </Page>
  );
};
