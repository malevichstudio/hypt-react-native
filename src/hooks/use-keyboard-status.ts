import React from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardOpen;
};
