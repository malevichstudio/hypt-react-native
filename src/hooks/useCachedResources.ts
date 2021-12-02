import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'FuturaPT-Light': require('../assets/fonts/FuturaPT-Light.ttf'),
          'FuturaPT-Book': require('../assets/fonts/FuturaPT-Book.ttf'),
          'FuturaPT-Medium': require('../assets/fonts/FuturaPT-Medium.ttf'),
          'FuturaPT-Demi': require('../assets/fonts/FuturaPT-Demi.ttf'),
          'FuturaPT-Bold': require('../assets/fonts/FuturaPT-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
