import {useCallback, useEffect, useMemo, useState} from 'react';
import {Card} from '../models/card';
import {CardRepository} from '../repositories';
import {CardService} from '../services';

export function useCardsController() {
  const service = useMemo(() => new CardService(new CardRepository()), []);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(() => service.listCards().then(setCards), [service]);
  useEffect(() => { reload().finally(() => setLoading(false)); }, [reload]);
  const createCard = useCallback(async (name: string) => service.createCard(name), [service]);
  const duplicateCard = useCallback(async (id: string) => { await service.duplicateCard(id); await reload(); }, [reload, service]);
  const renameCard = useCallback(async (id: string, name: string) => { await service.renameCard(id, name); await reload(); }, [reload, service]);
  const deleteCard = useCallback(async (id: string) => { await service.deleteCard(id); await reload(); }, [reload, service]);
  return {cards, loading, createCard, duplicateCard, renameCard, deleteCard, reload};
}
