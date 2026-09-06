import {useCallback, useEffect, useMemo, useState} from 'react';
import Share from 'react-native-share';
import {Card} from '../models/card';
import {CardRepository} from '../repositories';
import {CardService, ShareFileService} from '../services';
import {useLanguage} from '../i18n/I18nContext';
import type {CardStrings} from '../services/CardService';

export function useShareFileController(cardId: string) {
  const cardService = useMemo(() => new CardService(new CardRepository()), []);
  const shareService = useMemo(() => new ShareFileService(), []);
  const {t} = useLanguage();
  const strings: CardStrings = useMemo(() => ({defaultCardName: t('card.defaultCardName'), copyOf: name => t('card.copyOfPrefix', {name}), fieldLabels: {name: t('fieldDefaults.name'), phone: t('fieldDefaults.phone'), email: t('fieldDefaults.email'), text: t('fieldDefaults.newText'), photo: t('fieldDefaults.photo')}, notFoundError: t('card.notFoundError')}), [t]);
  const [card, setCard] = useState<Card>({id: cardId, name: '', fields: []});
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cardService.getCard(cardId, strings).then(loaded => {
      if (loaded) { setCard(loaded); setSelectedFieldIds(loaded.fields.filter(field => field.shareable).map(field => field.id)); }
    }).finally(() => setLoading(false));
  }, [cardId, cardService, strings]);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(current => current.includes(id) ? current.filter(fieldId => fieldId !== id) : [...current, id]);
  }, []);
  const share = useCallback(async () => {
    try {
      await Share.open({url: shareService.buildVcardDataUrl(card, selectedFieldIds), filename: 'contact', type: 'text/vcard', useInternalStorage: true});
    } catch {}
  }, [card, selectedFieldIds, shareService]);

  return {card, loading, selectedFieldIds, toggleField, share};
}
