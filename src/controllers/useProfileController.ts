import {useCallback, useEffect, useMemo, useState} from 'react';
import {Profile, ProfileField} from '../models/profile';
import {ProfileRepository} from '../repositories';
import {ProfileService} from '../services';

export function useProfileController() {
  const service = useMemo(() => new ProfileService(new ProfileRepository()), []);
  const [profile, setProfile] = useState<Profile>({fields: []});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.load().then(setProfile).finally(() => setLoading(false));
  }, [service]);

  const updateField = useCallback((id: string, changes: Partial<ProfileField>) => {
    setProfile(current => ({...current, fields: current.fields.map(field => field.id === id ? {...field, ...changes} : field)}));
  }, []);
  const addField = useCallback(() => setProfile(current => ({...current, fields: [...current.fields, {id: `custom-${Date.now()}`, label: 'Nuevo campo', value: '', shareable: true}]})), []);
  const removeField = useCallback((id: string) => setProfile(current => ({...current, fields: current.fields.filter(field => field.id !== id)})), []);
  const setPhotoUri = useCallback((photoUri: string) => setProfile(current => ({...current, photoUri})), []);
  const save = useCallback(() => service.save(profile), [profile, service]);

  return {profile, loading, updateField, addField, removeField, setPhotoUri, save};
}
