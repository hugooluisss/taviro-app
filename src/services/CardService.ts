import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, CardField, FieldType} from '../models/card';
import {CardRepository} from '../repositories';

const LEGACY_KEY = '@taviro/profile';
const labels: Record<FieldType, string> = {text: 'Nuevo campo', phone: 'Teléfono', email: 'Email', photo: 'Foto/Logo'};
const baseFields = (): CardField[] => [
  {id: 'name', type: 'text', label: 'Nombre', value: '', shareable: true},
  {id: 'phone', type: 'phone', label: 'Teléfono', value: '', shareable: true},
  {id: 'email', type: 'email', label: 'Email', value: '', shareable: true},
];

export class CardService {
  constructor(private readonly repository: CardRepository) {}

  async listCards(): Promise<Card[]> {
    const saved = await this.repository.getAll();
    if (saved?.length) return saved;

    const legacy = await AsyncStorage.getItem(LEGACY_KEY);
    const parsed = legacy ? JSON.parse(legacy) : null;
    const card: Card = parsed ? {
      id: 'default',
      name: 'Mi tarjeta',
      fields: [
        ...(parsed.fields ?? []).map((field: {id: string; label: string; value: string; shareable: boolean}) => ({...field, type: 'text' as const})),
        ...(parsed.photoUri ? [{id: 'photo', type: 'photo' as const, label: 'Foto/Logo', value: parsed.photoUri, shareable: false}] : []),
      ],
    } : {id: 'default', name: 'Mi tarjeta', fields: baseFields()};
    await this.repository.saveAll([card]);
    return [card];
  }

  async getCard(id: string): Promise<Card | undefined> {
    return (await this.listCards()).find(card => card.id === id);
  }

  async createCard(name: string): Promise<Card> {
    const cards = await this.listCards();
    const card = {id: `card-${Date.now()}`, name, fields: baseFields()};
    await this.repository.saveAll([...cards, card]);
    return card;
  }

  async duplicateCard(id: string): Promise<Card> {
    const cards = await this.listCards();
    const source = cards.find(card => card.id === id);
    if (!source) throw new Error('Tarjeta no encontrada');
    const card = {
      ...source,
      id: `card-${Date.now()}`,
      name: `Copia de ${source.name}`,
      fields: source.fields.map((field, index) => ({...field, id: `${field.id}-${Date.now()}-${index}`})),
    };
    await this.repository.saveAll([...cards, card]);
    return card;
  }

  async renameCard(id: string, name: string): Promise<void> {
    const cards = await this.listCards();
    await this.repository.saveAll(cards.map(card => card.id === id ? {...card, name: name.trim()} : card));
  }

  async deleteCard(id: string): Promise<void> {
    const cards = await this.listCards();
    if (cards.length > 1) await this.repository.saveAll(cards.filter(card => card.id !== id));
  }

  async saveCard(card: Card): Promise<void> {
    const cards = await this.listCards();
    const fields = card.fields
      .map(field => ({...field, label: field.label.trim(), value: field.value.trim()}))
      .filter(field => field.label);
    await this.repository.saveAll(cards.map(current => current.id === card.id ? {...card, name: card.name.trim(), fields} : current));
  }

  static labelFor(type: FieldType): string { return labels[type]; }
}
