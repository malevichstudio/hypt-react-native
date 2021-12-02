import 'intl';
import 'intl/locale-data/jsonp/ar';
import 'intl/locale-data/jsonp/en';

import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { I18nManager } from 'react-native';

const languages = {
  en: require('../locale/en_US.json'),
  ar: require('../locale/ar_AE.json'),
};

type Props = {
  children: React.ReactNode;
};

const TEST_LOCALE = 'en';

export function IntlProvider({ children }: Props) {
  const messages = languages[TEST_LOCALE];

  I18nManager.forceRTL(false);

  return (
    <ReactIntlProvider
      messages={messages}
      locale={TEST_LOCALE}
      defaultLocale={TEST_LOCALE}
    >
      {children}
    </ReactIntlProvider>
  );
}
