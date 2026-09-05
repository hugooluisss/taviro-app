import {Card} from '../models/card';
import {CardService} from './CardService';

jest.mock('@react-native-async-storage/async-storage', () => ({getItem: jest.fn().mockResolvedValue(null)}));

class MemoryRepository {
  cards: Card[] | null = null;
  async getAll() { return this.cards; }
  async saveAll(cards: Card[]) { this.cards = cards; }
}

test('keeps one card, duplicates with new ids, and cannot delete the last', async () => {
  const repository = new MemoryRepository();
  const service = new CardService(repository);
  const first = (await service.listCards())[0];
  const copy = await service.duplicateCard(first.id);
  expect(copy.name).toBe('Copia de Mi tarjeta');
  expect(copy.fields.map(field => field.id)).not.toEqual(first.fields.map(field => field.id));
  await service.deleteCard(first.id);
  await service.deleteCard(copy.id);
  expect((await service.listCards()).length).toBe(1);
});
