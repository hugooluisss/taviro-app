import {useCallback, useEffect, useMemo, useState} from 'react';
import {Profile, SelectedFieldIds} from '../models/profile';
import {ProfileRepository} from '../repositories';
import {buildShareableCard, ProfileService} from '../services';

export function useShareQrController() {
  const service = useMemo(() => new ProfileService(new ProfileRepository()), []);
  const [profile, setProfile] = useState<Profile>({fields: []});
  const [selectedFieldIds, setSelectedFieldIds] = useState<SelectedFieldIds>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.load().then(value => {
      setProfile(value);
      setSelectedFieldIds(value.fields.filter(field => field.shareable).map(field => field.id));
    }).finally(() => setLoading(false));
  }, [service]);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(current => current.includes(id) ? current.filter(fieldId => fieldId !== id) : [...current, id]);
  }, []);
  const {vcard} = buildShareableCard(profile, selectedFieldIds);

  return {profile, selectedFieldIds, toggleField, vcard, loading};
}
