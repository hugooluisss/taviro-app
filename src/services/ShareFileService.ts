import {Card, SelectedFieldIds} from '../models/card';
import {buildShareableCard} from './ShareableCardService';
import {utf8ToBase64} from '../lib/base64';

export class ShareFileService {
  buildVcardDataUrl(card: Card, selectedFieldIds: SelectedFieldIds): string {
    const {vcard} = buildShareableCard(card, selectedFieldIds);
    return `data:text/vcard;base64,${utf8ToBase64(vcard)}`;
  }
}
