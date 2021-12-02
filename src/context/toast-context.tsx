import React from 'react';
import Toast from 'react-native-toast-message';

import { useErrorsStore } from '../graphql/client/error-link';
import { useIntl } from '../hooks';

type Props = {
  children: React.ReactNode;
};

type ToastType = {
  type?: string;
  title?: string;
  description?: string;
};

type ContextProps = {
  showToast: (options: ToastType) => void;
};

export const ToastContext = React.createContext<ContextProps>({
  showToast: () => {},
});

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: Props) => {
  const { hasError, error, date } = useErrorsStore((state) => state);
  const { intl } = useIntl();

  React.useEffect(() => {
    if (hasError) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        visibilityTime: 5000,
        text1: 'Произошла ошибка :(',
        text2: error?.message || error[0]?.message || '',
      });
    }
  }, [error, hasError, date]);

  const handleShowToast = ({
    type = 'success',
    title = intl('app.done'),
    description = '',
  }) => {
    Toast.show({
      type: type,
      position: 'bottom',
      visibilityTime: 5000,
      text1: title,
      text2: description,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast: handleShowToast }}>
      {children}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ToastContext.Provider>
  );
};
