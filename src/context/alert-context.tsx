import { AlertDialog, Button } from 'native-base';
import React from 'react';

import { useIntl } from '../hooks';

export const AlertProvider = ({ children }: Props) => {
  const { intl } = useIntl();

  const [alert, setAlert] = React.useState<AlertType>({
    isOpen: false,
  });
  const cancelRef = React.useRef(null);

  const handleShowAlert = ({ ...props }: AlertType) => {
    setAlert({
      ...props,
      isOpen: true,
    });
  };

  const handleClose = () => setAlert({ isOpen: false });

  return (
    <AlertContext.Provider value={{ showAlert: handleShowAlert }}>
      {children}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={alert.isOpen}
        onClose={handleClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton w='30px' h='30px' />
          <AlertDialog.Header>
            {alert?.title || intl('app.info')}
          </AlertDialog.Header>
          <AlertDialog.Body>
            {alert.description || intl('app.you-need-to-be-auth')}
          </AlertDialog.Body>
          {alert.onAccept || alert.onCancel ? (
            <AlertDialog.Footer>
              {alert.onAccept ? (
                <Button
                  onPress={() => {
                    alert?.onAccept && alert.onAccept();
                    handleClose();
                  }}
                >
                  {alert.acceptText || intl('app.login')}
                </Button>
              ) : null}
              {alert.onCancel ? (
                <Button
                  colorScheme='danger'
                  ml={2}
                  onPress={() => {
                    alert?.onCancel && alert.onCancel();
                    handleClose();
                  }}
                  ref={cancelRef}
                >
                  {alert.cancelText || intl('app.cancel')}
                </Button>
              ) : null}
            </AlertDialog.Footer>
          ) : null}
        </AlertDialog.Content>
      </AlertDialog>
    </AlertContext.Provider>
  );
};

type Props = {
  children: React.ReactNode;
};

type AlertType = {
  isOpen?: boolean;
  title?: string;
  description?: string;
  acceptText?: string;
  cancelText?: string;
  onAccept?: () => void | null;
  onCancel?: () => void | null;
};

type ContextProps = {
  showAlert: (options: AlertType) => void;
};

export const AlertContext = React.createContext<ContextProps>({
  showAlert: () => {},
});

export const useAlertContext = () => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within a AlertProvider');
  }
  return context;
};
