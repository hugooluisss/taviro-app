import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from '../models/card';

const KEY = '@taviro/cards';

export class CardRepository {
  async getAll(): Promise<Card[] | null> {
    const value = await AsyncStorage.getItem(KEY);
    return value ? JSON.parse(value) : null;
  }

  async saveAll(cards: Card[]): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(cards));
  }
}
