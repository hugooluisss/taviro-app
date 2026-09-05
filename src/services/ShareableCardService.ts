import {Card, SelectedFieldIds} from '../models/card';

const escapeVCard = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

export function buildShareableCard(card: Card, selectedFieldIds: SelectedFieldIds) {
  // ponytail: photo fields render in the UI only, not embedded in vcard/text; add PHOTO;ENCODING=BASE64 if a real need shows up
  const fields = card.fields.filter(field => field.type !== 'photo' && selectedFieldIds.includes(field.id) && field.value.trim());
  const lines = fields.map(field => `${field.label}: ${field.value.trim()}`);
  const vcardFields = fields.map(field => `item1.X-${escapeVCard(field.label.toUpperCase())}:${escapeVCard(field.value.trim())}`);
  return {
    vcard: ['BEGIN:VCARD', 'VERSION:3.0', ...vcardFields, 'END:VCARD'].join('\r\n'),
    text: lines.join('\n'),
  };
}
