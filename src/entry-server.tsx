import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';

import App from './App.tsx';
import { createI18n, type Locale } from './i18n/config.ts';

export async function render(locale: Locale) {
  const i18n = await createI18n(locale);

  return renderToString(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  );
}
