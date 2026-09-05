import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {LanguageService} from '../services/LanguageService';
import {Language, getDeviceLanguage} from './locale';
import es from './translations/es';
import en from './translations/en';
import {LanguagePreference} from '../repositories/LanguageRepository';

const translations: Record<Language, Record<string, string>> = {es, en};
type TranslationParams = Record<string, string | number>;
type LanguageContextValue = {language: Language; preference: LanguagePreference; setLanguagePreference: (preference: LanguagePreference) => Promise<void>; t: (key: string, params?: TranslationParams) => string};
export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({children}: React.PropsWithChildren) {
  const service = useMemo(() => new LanguageService(), []);
  const [preference, setPreference] = useState<LanguagePreference>('system');
  const [language, setLanguage] = useState<Language>(getDeviceLanguage());
  useEffect(() => { service.getPreference().then(value => { setPreference(value); setLanguage(service.resolveLanguage(value)); }); }, [service]);
  const setLanguagePreference = useCallback(async (value: LanguagePreference) => { await service.setPreference(value); setPreference(value); setLanguage(service.resolveLanguage(value)); }, [service]);
  const t = useCallback((key: string, params?: TranslationParams) => {
    let value = translations[language][key] ?? translations.es[key] ?? key;
    return params ? value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`)) : value;
  }, [language]);
  return <LanguageContext.Provider value={{language, preference, setLanguagePreference, t}}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
