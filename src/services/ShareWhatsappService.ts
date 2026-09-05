import {Card, SelectedFieldIds} from '../models/card';
import {buildShareableCard} from './ShareableCardService';

export class ShareWhatsappService {
  buildText(card: Card, selectedFieldIds: SelectedFieldIds): string {
    return buildShareableCard(card, selectedFieldIds).text;
  }

  buildWhatsappUrl(text: string): string {
    return `whatsapp://send?text=${encodeURIComponent(text)}`;
  }
}
