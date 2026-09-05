import {useCallback, useEffect, useMemo, useState} from 'react';
import {Card, CardField, FieldType} from '../models/card';
import {CardRepository} from '../repositories';
import {CardService} from '../services';

export function useCardController(cardId: string) {
  const service = useMemo(() => new CardService(new CardRepository()), []);
  const [card, setCard] = useState<Card>({id: cardId, name: '', fields: []});
  const [loading, setLoading] = useState(true);
  useEffect(() => { service.getCard(cardId).then(value => value && setCard(value)).finally(() => setLoading(false)); }, [cardId, service]);
  const updateField = useCallback((id: string, changes: Partial<CardField>) => setCard(current => ({...current, fields: current.fields.map(field => field.id === id ? {...field, ...changes} : field)})), []);
  const addField = useCallback((type: FieldType) => setCard(current => ({...current, fields: [...current.fields, {id: `${type}-${Date.now()}`, type, label: CardService.labelFor(type), value: '', shareable: type !== 'photo'}]})), []);
  const removeField = useCallback((id: string) => setCard(current => ({...current, fields: current.fields.filter(field => field.id !== id)})), []);
  const updateName = useCallback((name: string) => setCard(current => ({...current, name})), []);
  const save = useCallback(() => service.saveCard(card), [card, service]);
  return {card, loading, updateField, addField, removeField, updateName, save};
}
