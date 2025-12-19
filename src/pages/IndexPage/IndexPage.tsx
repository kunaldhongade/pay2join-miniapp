import { Section, Cell, Image, List, Title, Text } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import { bem } from '@/css/bem.ts';

import tonSvg from './ton.svg';
import './IndexPage.css';

const [, e] = bem('index-page');

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <div className={e('hero')}>
        <div className={e('hero-icon')}>💎</div>
        <Title level="1" className={e('hero-title')}>Pay2Join</Title>
        <Text className={e('hero-subtitle')}>Unlock premium content with TON</Text>
      </div>
      <List>
        <Section
          header={
            <div className={e('section-header')}>
              <Title level="2">Get Started</Title>
            </div>
          }
        >
          <Link to="/ton-connect">
            <Cell
              before={
                <div className={e('feature-icon')}>
                  <Image src={tonSvg} style={{ width: '100%', height: '100%' }}/>
                </div>
              }
              subtitle="Connect your TON wallet and start using Pay2Join"
              className={e('feature-cell')}
            >
              <Title level="3">Connect Wallet</Title>
            </Cell>
          </Link>
        </Section>
        <Section
          header={
            <div className={e('section-header')}>
              <Title level="2">Developer Tools</Title>
            </div>
          }
          footer={
            <Text className={e('section-footer')}>
              Explore Telegram Mini Apps features and integration details
            </Text>
          }
        >
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data" className={e('dev-cell')}>
              Init Data
            </Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc." className={e('dev-cell')}>
              Launch Parameters
            </Cell>
          </Link>
          <Link to="/theme-params">
            <Cell subtitle="Telegram application palette information" className={e('dev-cell')}>
              Theme Parameters
            </Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
