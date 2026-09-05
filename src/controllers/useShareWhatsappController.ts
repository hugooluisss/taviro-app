import {useCallback, useEffect, useMemo, useState} from 'react';
import {Linking, Share} from 'react-native';
import {Profile} from '../models/profile';
import {ProfileRepository} from '../repositories';
import {ProfileService, ShareWhatsappService} from '../services';

export function useShareWhatsappController() {
  const profileService = useMemo(() => new ProfileService(new ProfileRepository()), []);
  const shareService = useMemo(() => new ShareWhatsappService(), []);
  const [profile, setProfile] = useState<Profile>({fields: []});
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappAvailable, setWhatsappAvailable] = useState(false);

  useEffect(() => {
    profileService.load().then(loaded => {
      setProfile(loaded);
      setSelectedFieldIds(loaded.fields.filter(field => field.shareable).map(field => field.id));
    }).finally(() => setLoading(false));
  }, [profileService]);

  useEffect(() => {
    Linking.canOpenURL('whatsapp://send').then(setWhatsappAvailable).catch(() => setWhatsappAvailable(false));
  }, []);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(current => current.includes(id) ? current.filter(fieldId => fieldId !== id) : [...current, id]);
  }, []);
  const share = useCallback(() => Share.share({message: shareService.buildText(profile, selectedFieldIds)}), [profile, selectedFieldIds, shareService]);
  const openWhatsApp = useCallback(async () => {
    const url = shareService.buildWhatsappUrl(shareService.buildText(profile, selectedFieldIds));
    if (await Linking.canOpenURL(url)) await Linking.openURL(url);
  }, [profile, selectedFieldIds, shareService]);

  return {profile, loading, selectedFieldIds, toggleField, share, openWhatsApp, whatsappAvailable};
}
