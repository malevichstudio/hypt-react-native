import * as ExpoSecureStore from 'expo-secure-store';

export const SecureStore = {
  async setValue(key: string, value: string) {
    await ExpoSecureStore.setItemAsync(key, value);
  },
  async getValue(key: string) {
    return await ExpoSecureStore.getItemAsync(key);
  },
  async deleteValue(key: string) {
    return await ExpoSecureStore.deleteItemAsync(key);
  },
};
