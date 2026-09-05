import {useCallback, useEffect, useMemo, useState} from 'react';
import {useProfileController} from './useProfileController';
import {ShareNfcService} from '../services/ShareNfcService';

export function useShareNfcController() {
  const {profile, loading} = useProfileController();
  const service = useMemo(() => new ShareNfcService(), []);
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) setSelectedFieldIds(profile.fields.filter(field => field.shareable).map(field => field.id));
  }, [loading, profile.fields]);

  useEffect(() => () => { service.stop().catch(() => undefined); }, [service]);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(ids => ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id]);
  }, []);

  const toggleSharing = useCallback(async () => {
    setError(null);
    try {
      if (sharing) await service.stop();
      else await service.start(profile, selectedFieldIds);
      setSharing(!sharing);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo activar NFC');
    }
  }, [profile, selectedFieldIds, service, sharing]);

  return {profile, loading, selectedFieldIds, toggleField, sharing, toggleSharing, error};
}
