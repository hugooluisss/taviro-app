import {getDeviceLanguage, Language} from '../i18n/locale';
import {LanguagePreference, LanguageRepository} from '../repositories/LanguageRepository';

export class LanguageService {
  constructor(private readonly repository = new LanguageRepository()) {}

  getPreference(): Promise<LanguagePreference> {
    return this.repository.getPreference().then(value => value ?? 'system').catch(() => 'system');
  }

  setPreference(preference: LanguagePreference): Promise<void> {
    return this.repository.setPreference(preference);
  }

  resolveLanguage(preference: LanguagePreference): Language {
    return preference === 'system' ? getDeviceLanguage() : preference;
  }
}
