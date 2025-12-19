import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { useLaunchParams, useSignal, miniApp } from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useEffect } from 'react';

import { routes } from '@/navigation/routes.tsx';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  
  // Force dark theme
  const forceDark = true;

  // Add dark class to html element for Tailwind
  useEffect(() => {
    if (forceDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [forceDark]);

  return (
    <AppRoot
      appearance={forceDark ? 'dark' : (isDark ? 'dark' : 'light')}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}
