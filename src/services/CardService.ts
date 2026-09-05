import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, CardField, FieldType} from '../models/card';
import {CardRepository} from '../repositories';

const LEGACY_KEY = '@taviro/profile';
export type CardStrings = {defaultCardName: string; copyOf: (name: string) => string; fieldLabels: Record<FieldType | 'name', string>; notFoundError: string};
const baseFields = (labels: CardStrings['fieldLabels']): CardField[] => [
  {id: 'name', type: 'text', label: labels.name, value: '', shareable: true},
  {id: 'phone', type: 'phone', label: labels.phone, value: '', shareable: true},
  {id: 'email', type: 'email', label: labels.email, value: '', shareable: true},
];

export class CardService {
  constructor(private readonly repository: CardRepository) {}

  async listCards(strings: CardStrings): Promise<Card[]> {
    const saved = await this.repository.getAll();
    if (saved?.length) return saved;

    const legacy = await AsyncStorage.getItem(LEGACY_KEY);
    const parsed = legacy ? JSON.parse(legacy) : null;
    const card: Card = parsed ? {
      id: 'default',
      name: strings.defaultCardName,
      fields: [
        ...(parsed.fields ?? []).map((field: {id: string; label: string; value: string; shareable: boolean}) => ({...field, type: 'text' as const})),
        ...(parsed.photoUri ? [{id: 'photo', type: 'photo' as const, label: strings.fieldLabels.photo, value: parsed.photoUri, shareable: false}] : []),
      ],
    } : {id: 'default', name: strings.defaultCardName, fields: baseFields(strings.fieldLabels)};
    await this.repository.saveAll([card]);
    return [card];
  }

  async getCard(id: string, strings: CardStrings): Promise<Card | undefined> {
    return (await this.listCards(strings)).find(card => card.id === id);
  }

  async createCard(name: string, strings: CardStrings): Promise<Card> {
    const cards = await this.listCards(strings);
    const card = {id: `card-${Date.now()}`, name, fields: baseFields(strings.fieldLabels)};
    await this.repository.saveAll([...cards, card]);
    return card;
  }

  async duplicateCard(id: string, strings: CardStrings): Promise<Card> {
    const cards = await this.listCards(strings);
    const source = cards.find(card => card.id === id);
    if (!source) throw new Error(strings.notFoundError);
    const card = {
      ...source,
      id: `card-${Date.now()}`,
      name: strings.copyOf(source.name),
      fields: source.fields.map((field, index) => ({...field, id: `${field.id}-${Date.now()}-${index}`})),
    };
    await this.repository.saveAll([...cards, card]);
    return card;
  }

  async renameCard(id: string, name: string, strings: CardStrings): Promise<void> {
    const cards = await this.listCards(strings);
    await this.repository.saveAll(cards.map(card => card.id === id ? {...card, name: name.trim()} : card));
  }

  async deleteCard(id: string, strings: CardStrings): Promise<void> {
    const cards = await this.listCards(strings);
    if (cards.length > 1) await this.repository.saveAll(cards.filter(card => card.id !== id));
  }

  async saveCard(card: Card, strings: CardStrings): Promise<void> {
    const cards = await this.listCards(strings);
    const fields = card.fields
      .map(field => ({...field, label: field.label.trim(), value: field.value.trim()}))
      .filter(field => field.label);
    await this.repository.saveAll(cards.map(current => current.id === card.id ? {...card, name: card.name.trim(), fields} : current));
  }

  static labelFor(type: FieldType, labels: CardStrings['fieldLabels']): string { return labels[type]; }
}
