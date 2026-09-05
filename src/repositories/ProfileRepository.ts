import AsyncStorage from '@react-native-async-storage/async-storage';
import {Profile} from '../models/profile';

const KEY = '@taviro/profile';

export class ProfileRepository {
  async get(): Promise<Profile | null> {
    const value = await AsyncStorage.getItem(KEY);
    return value ? JSON.parse(value) : null;
  }

  async save(profile: Profile): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(profile));
  }
}
