// Include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

// Polyfills must be loaded before importing TON SDKs.
import './polyfills.ts';

import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { EnvUnsupported } from '@/components/EnvUnsupported.tsx';
import { Root } from '@/components/Root.tsx';
import { init } from '@/init.ts';

import './index.css';

// Mock the environment in case, we are outside Telegram.
// This must be imported BEFORE retrieveLaunchParams is called
import './mockEnv.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Check if we're running inside Telegram before trying to retrieve launch params
const isTelegramEnv = Boolean((window as any)?.Telegram?.WebApp);
const allowMockInProduction = new URLSearchParams(window.location.search).get('mock') === 'true';

let launchParams;
let platform = 'tdesktop';
let debug = import.meta.env.DEV;

try {
  launchParams = retrieveLaunchParams();
  platform = launchParams.tgWebAppPlatform;
  debug = (launchParams.tgWebAppStartParam || '').includes('debug') || import.meta.env.DEV;
} catch (e) {
  // If retrieveLaunchParams fails:
  // 1. In dev mode, mockEnv should have handled it
  // 2. In production with ?mock=true, mockEnv should handle it
  // 3. Otherwise, show error for production access outside Telegram
  if (!isTelegramEnv && !import.meta.env.DEV && !allowMockInProduction) {
    // Production mode, accessed outside Telegram, and mock not enabled
    root.render(<EnvUnsupported />);
    throw e; // Stop execution
  }
  // Otherwise, mock should have been set up, continue with defaults
  console.warn('Running with mocked Telegram environment');
}

// Configure all application dependencies.
try {
  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(platform),
    mockForMacOS: platform === 'macos',
  });

  root.render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
} catch (e) {
  // If initialization fails, show error
  console.error('Failed to initialize app:', e);
  root.render(<EnvUnsupported />);
}
