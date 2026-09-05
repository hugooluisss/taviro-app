import {NativeModules} from 'react-native';

export type Language = 'es' | 'en';

export function getDeviceLanguage(): Language {
  const locale = NativeModules.I18nManager?.localeIdentifier;
  const language = typeof locale === 'string' ? locale.slice(0, 2).toLowerCase() : '';
  return language === 'es' ? 'es' : 'en';
}
