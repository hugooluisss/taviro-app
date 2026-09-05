import {useCallback, useEffect, useMemo, useState} from 'react';
import {Card} from '../models/card';
import {CardRepository} from '../repositories';
import {CardService} from '../services';
import {useLanguage} from '../i18n/I18nContext';

export function useCardsController() {
  const service = useMemo(() => new CardService(new CardRepository()), []);
  const {t} = useLanguage();
  const strings = useMemo(() => ({defaultCardName: t('card.defaultCardName'), copyOf: (name: string) => t('card.copyOfPrefix', {name}), fieldLabels: {name: t('fieldDefaults.name'), phone: t('fieldDefaults.phone'), email: t('fieldDefaults.email'), text: t('fieldDefaults.newText'), photo: t('fieldDefaults.photo')}, notFoundError: t('card.notFoundError')}), [t]);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(() => service.listCards(strings).then(setCards), [service, strings]);
  useEffect(() => { reload().finally(() => setLoading(false)); }, [reload]);
  const createCard = useCallback(async (name: string) => service.createCard(name, strings), [service, strings]);
  const duplicateCard = useCallback(async (id: string) => { await service.duplicateCard(id, strings); await reload(); }, [reload, service, strings]);
  const renameCard = useCallback(async (id: string, name: string) => { await service.renameCard(id, name, strings); await reload(); }, [reload, service, strings]);
  const deleteCard = useCallback(async (id: string) => { await service.deleteCard(id, strings); await reload(); }, [reload, service, strings]);
  return {cards, loading, createCard, duplicateCard, renameCard, deleteCard, reload};
}
