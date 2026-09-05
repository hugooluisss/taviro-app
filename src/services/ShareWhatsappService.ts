import {Profile, SelectedFieldIds} from '../models/profile';
import {buildShareableCard} from './ShareableCardService';

export class ShareWhatsappService {
  buildText(profile: Profile, selectedFieldIds: SelectedFieldIds): string {
    return buildShareableCard(profile, selectedFieldIds).text;
  }

  buildWhatsappUrl(text: string): string {
    return `whatsapp://send?text=${encodeURIComponent(text)}`;
  }
}
