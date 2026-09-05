import {useEffect, useMemo, useState, useCallback} from 'react';
import {Card} from '../models/card';
import {CardRepository} from '../repositories';
import {CardService} from '../services';
import {ShareNfcService} from '../services/ShareNfcService';
import {useLanguage} from '../i18n/I18nContext';
import type {CardStrings} from '../services/CardService';

export function useShareNfcController(cardId: string) {
  const cardService = useMemo(() => new CardService(new CardRepository()), []);
  const service = useMemo(() => new ShareNfcService(), []);
  const {t} = useLanguage();
  const strings: CardStrings = useMemo(() => ({defaultCardName: t('card.defaultCardName'), copyOf: name => t('card.copyOfPrefix', {name}), fieldLabels: {name: t('fieldDefaults.name'), phone: t('fieldDefaults.phone'), email: t('fieldDefaults.email'), text: t('fieldDefaults.newText'), photo: t('fieldDefaults.photo')}, notFoundError: t('card.notFoundError')}), [t]);
  const [card, setCard] = useState<Card>({id: cardId, name: '', fields: []});
  const [loading, setLoading] = useState(true);
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { cardService.getCard(cardId, strings).then(value => { if (value) { setCard(value); setSelectedFieldIds(value.fields.filter(field => field.shareable).map(field => field.id)); } }).finally(() => setLoading(false)); }, [cardId, cardService, strings]);

  useEffect(() => () => { service.stop().catch(() => undefined); }, [service]);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(ids => ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id]);
  }, []);

  const toggleSharing = useCallback(async () => {
    setError(null);
    try {
      if (sharing) await service.stop();
      else await service.start(card, selectedFieldIds);
      setSharing(!sharing);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo activar NFC');
    }
  }, [card, selectedFieldIds, service, sharing]);

  return {card, loading, selectedFieldIds, toggleField, sharing, toggleSharing, error};
}
