import {useCallback, useEffect, useMemo, useState} from 'react';
import {Linking, Share} from 'react-native';
import {Card} from '../models/card';
import {CardRepository} from '../repositories';
import {CardService, ShareWhatsappService} from '../services';
import {useLanguage} from '../i18n/I18nContext';
import type {CardStrings} from '../services/CardService';

export function useShareWhatsappController(cardId: string) {
  const cardService = useMemo(() => new CardService(new CardRepository()), []);
  const shareService = useMemo(() => new ShareWhatsappService(), []);
  const {t} = useLanguage();
  const strings: CardStrings = useMemo(() => ({defaultCardName: t('card.defaultCardName'), copyOf: name => t('card.copyOfPrefix', {name}), fieldLabels: {name: t('fieldDefaults.name'), phone: t('fieldDefaults.phone'), email: t('fieldDefaults.email'), text: t('fieldDefaults.newText'), photo: t('fieldDefaults.photo')}, notFoundError: t('card.notFoundError')}), [t]);
  const [card, setCard] = useState<Card>({id: cardId, name: '', fields: []});
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappAvailable, setWhatsappAvailable] = useState(false);

  useEffect(() => {
    cardService.getCard(cardId, strings).then(loaded => {
      if (loaded) { setCard(loaded); setSelectedFieldIds(loaded.fields.filter(field => field.shareable).map(field => field.id)); }
    }).finally(() => setLoading(false));
  }, [cardId, cardService, strings]);

  useEffect(() => {
    Linking.canOpenURL('whatsapp://send').then(setWhatsappAvailable).catch(() => setWhatsappAvailable(false));
  }, []);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(current => current.includes(id) ? current.filter(fieldId => fieldId !== id) : [...current, id]);
  }, []);
  const share = useCallback(() => Share.share({message: shareService.buildText(card, selectedFieldIds)}), [card, selectedFieldIds, shareService]);
  const openWhatsApp = useCallback(async () => {
    const url = shareService.buildWhatsappUrl(shareService.buildText(card, selectedFieldIds));
    if (await Linking.canOpenURL(url)) await Linking.openURL(url);
  }, [card, selectedFieldIds, shareService]);

  return {card, loading, selectedFieldIds, toggleField, share, openWhatsApp, whatsappAvailable};
}
