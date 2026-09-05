import {useCallback, useEffect, useMemo, useState} from 'react';
import {Card, SelectedFieldIds} from '../models/card';
import {CardRepository} from '../repositories';
import {buildShareableCard, CardService} from '../services';
import {useLanguage} from '../i18n/I18nContext';
import type {CardStrings} from '../services/CardService';

export function useShareQrController(cardId: string) {
  const service = useMemo(() => new CardService(new CardRepository()), []);
  const {t} = useLanguage();
  const strings: CardStrings = useMemo(() => ({defaultCardName: t('card.defaultCardName'), copyOf: name => t('card.copyOfPrefix', {name}), fieldLabels: {name: t('fieldDefaults.name'), phone: t('fieldDefaults.phone'), email: t('fieldDefaults.email'), text: t('fieldDefaults.newText'), photo: t('fieldDefaults.photo')}, notFoundError: t('card.notFoundError')}), [t]);
  const [card, setCard] = useState<Card>({id: cardId, name: '', fields: []});
  const [selectedFieldIds, setSelectedFieldIds] = useState<SelectedFieldIds>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getCard(cardId, strings).then(value => {
      if (value) { setCard(value); setSelectedFieldIds(value.fields.filter(field => field.shareable).map(field => field.id)); }
    }).finally(() => setLoading(false));
  }, [cardId, service, strings]);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(current => current.includes(id) ? current.filter(fieldId => fieldId !== id) : [...current, id]);
  }, []);
  const {vcard} = buildShareableCard(card, selectedFieldIds);

  return {card, selectedFieldIds, toggleField, vcard, loading};
}
