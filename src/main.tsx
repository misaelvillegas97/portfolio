import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import App from './App.tsx';
import './index.css';
import { createI18n, type Locale } from './i18n/config.ts';

async function hydrate() {
  const root = document.getElementById('root');
  if (!root) throw new Error('Missing #root element');

  const locale: Locale = /^\/en(?:\/|$)/u.test(window.location.pathname)
    || document.documentElement.lang.toLowerCase().startsWith('en')
    ? 'en'
    : 'es';
  const i18n = await createI18n(locale);

  const application = (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );

  if (root.childElementCount > 0) hydrateRoot(root, application);
  else createRoot(root).render(application);
}

void hydrate();
