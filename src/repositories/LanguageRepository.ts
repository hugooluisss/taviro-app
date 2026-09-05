import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguagePreference = 'system' | 'es' | 'en';

const KEY = '@taviro/language';

export class LanguageRepository {
  async getPreference(): Promise<LanguagePreference | null> {
    const value = await AsyncStorage.getItem(KEY);
    return value === 'system' || value === 'es' || value === 'en' ? value : null;
  }

  async setPreference(preference: LanguagePreference): Promise<void> {
    await AsyncStorage.setItem(KEY, preference);
  }
}
