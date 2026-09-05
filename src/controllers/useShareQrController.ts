import {useCallback, useEffect, useMemo, useState} from 'react';
import {Card, SelectedFieldIds} from '../models/card';
import {CardRepository} from '../repositories';
import {buildShareableCard, CardService} from '../services';

export function useShareQrController(cardId: string) {
  const service = useMemo(() => new CardService(new CardRepository()), []);
  const [card, setCard] = useState<Card>({id: cardId, name: '', fields: []});
  const [selectedFieldIds, setSelectedFieldIds] = useState<SelectedFieldIds>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getCard(cardId).then(value => {
      if (value) { setCard(value); setSelectedFieldIds(value.fields.filter(field => field.shareable).map(field => field.id)); }
    }).finally(() => setLoading(false));
  }, [cardId, service]);

  const toggleField = useCallback((id: string) => {
    setSelectedFieldIds(current => current.includes(id) ? current.filter(fieldId => fieldId !== id) : [...current, id]);
  }, []);
  const {vcard} = buildShareableCard(card, selectedFieldIds);

  return {card, selectedFieldIds, toggleField, vcard, loading};
}
