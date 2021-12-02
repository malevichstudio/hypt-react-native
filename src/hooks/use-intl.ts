import {
  FormatXMLElementFn,
  Options as IntlMessageFormatOptions,
  PrimitiveType,
} from 'intl-messageformat';
import { useIntl as useReactIntl } from 'react-intl';

export const useIntl = () => {
  const intl = useReactIntl();

  return {
    intl: (
      id: string,
      values?: Record<
        string,
        PrimitiveType | FormatXMLElementFn<string, string>
      >,
      options?: IntlMessageFormatOptions,
    ) => {
      return intl.formatMessage(
        {
          id,
        },
        { ...values },
        { ...options },
      );
    },
  };
};
