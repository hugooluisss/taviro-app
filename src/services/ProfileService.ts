import {Profile, ProfileField} from '../models/profile';
import {ProfileRepository} from '../repositories';

const defaultFields: ProfileField[] = [
  {id: 'name', label: 'Nombre', value: '', shareable: true},
  {id: 'phone', label: 'Teléfono', value: '', shareable: true},
  {id: 'email', label: 'Email', value: '', shareable: true},
];

export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async load(): Promise<Profile> {
    return (await this.repository.get()) ?? {fields: defaultFields};
  }

  async save(profile: Profile): Promise<void> {
    const fields = profile.fields
      .map(field => ({...field, label: field.label.trim(), value: field.value.trim()}))
      .filter(field => field.label);
    await this.repository.save({...profile, fields});
  }
}
