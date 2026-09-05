import {NativeModules, Platform} from 'react-native';
import {Card, SelectedFieldIds} from '../models/card';
import {buildShareableCard} from './ShareableCardService';

type HceModule = {setCard(vcard: string): Promise<void>; setEnabled(enabled: boolean): Promise<void>};

export class ShareNfcService {
  private readonly hce: HceModule | undefined = NativeModules.TaviroNfcHce;

  async start(card: Card, selectedFieldIds: SelectedFieldIds): Promise<void> {
    if (Platform.OS !== 'android' || !this.hce) throw new Error('NFC HCE no disponible');
    await this.hce.setCard(buildShareableCard(card, selectedFieldIds).vcard);
    await this.hce.setEnabled(true);
  }

  stop(): Promise<void> {
    return this.hce ? this.hce.setEnabled(false) : Promise.resolve();
  }
}
