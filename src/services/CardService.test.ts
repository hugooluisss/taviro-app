import {Card} from '../models/card';
import {CardService} from './CardService';

const strings = {defaultCardName: 'My card', copyOf: (name: string) => `Copy of ${name}`, fieldLabels: {name: 'Name', phone: 'Phone', email: 'Email', text: 'New field', photo: 'Photo/Logo'}, notFoundError: 'Card not found'};

jest.mock('@react-native-async-storage/async-storage', () => ({getItem: jest.fn().mockResolvedValue(null)}));

class MemoryRepository {
  cards: Card[] | null = null;
  async getAll() { return this.cards; }
  async saveAll(cards: Card[]) { this.cards = cards; }
}

test('keeps one card, duplicates with new ids, and cannot delete the last', async () => {
  const repository = new MemoryRepository();
  const service = new CardService(repository);
  const first = (await service.listCards(strings))[0];
  const copy = await service.duplicateCard(first.id, strings);
  expect(copy.name).toBe('Copy of My card');
  expect(copy.fields.map(field => field.id)).not.toEqual(first.fields.map(field => field.id));
  await service.deleteCard(first.id, strings);
  await service.deleteCard(copy.id, strings);
  expect((await service.listCards(strings)).length).toBe(1);
});
