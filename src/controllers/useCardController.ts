import {useCallback, useEffect, useMemo, useState} from 'react';
import {Card, CardField, FieldType} from '../models/card';
import {CardRepository} from '../repositories';
import {CardService} from '../services';
import {useLanguage} from '../i18n/I18nContext';

export function useCardController(cardId: string) {
  const service = useMemo(() => new CardService(new CardRepository()), []);
  const {t} = useLanguage();
  const strings = useMemo(() => ({defaultCardName: t('card.defaultCardName'), copyOf: (name: string) => t('card.copyOfPrefix', {name}), fieldLabels: {name: t('fieldDefaults.name'), phone: t('fieldDefaults.phone'), email: t('fieldDefaults.email'), text: t('fieldDefaults.newText'), photo: t('fieldDefaults.photo')}, notFoundError: t('card.notFoundError')}), [t]);
  const [card, setCard] = useState<Card>({id: cardId, name: '', fields: []});
  const [loading, setLoading] = useState(true);
  useEffect(() => { service.getCard(cardId, strings).then(value => value && setCard(value)).finally(() => setLoading(false)); }, [cardId, service, strings]);
  const updateField = useCallback((id: string, changes: Partial<CardField>) => setCard(current => ({...current, fields: current.fields.map(field => field.id === id ? {...field, ...changes} : field)})), []);
  const addField = useCallback((type: FieldType) => setCard(current => ({...current, fields: [...current.fields, {id: `${type}-${Date.now()}`, type, label: CardService.labelFor(type, strings.fieldLabels), value: '', shareable: type !== 'photo'}]})), [strings]);
  const removeField = useCallback((id: string) => setCard(current => ({...current, fields: current.fields.filter(field => field.id !== id)})), []);
  const updateName = useCallback((name: string) => setCard(current => ({...current, name})), []);
  const save = useCallback(() => service.saveCard(card, strings), [card, service, strings]);
  return {card, loading, updateField, addField, removeField, updateName, save};
}
