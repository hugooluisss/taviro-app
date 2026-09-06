import {Card, SelectedFieldIds} from '../models/card';

const escapeVCard = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

export function buildShareableCard(card: Card, selectedFieldIds: SelectedFieldIds) {
  // ponytail: photo fields render in the UI only, not embedded in vcard/text; add PHOTO;ENCODING=BASE64 if a real need shows up
  const fields = card.fields.filter(field => field.type !== 'photo' && selectedFieldIds.includes(field.id) && field.value.trim());
  const lines = fields.map(field => `${field.label}: ${field.value.trim()}`);
  const nameField = fields.find(field => field.type === 'text');
  const name = nameField?.value.trim() || card.name.trim() || 'Contact';
  const textFields = fields.filter(field => field.type === 'text' && field !== nameField);
  const note = textFields.map(field => `${field.label}: ${field.value.trim()}`).join('\n');
  const vcardFields = [
    `FN:${escapeVCard(name)}`,
    `N:${escapeVCard(name)};;;;`,
    ...(note ? [`NOTE:${escapeVCard(note)}`] : []),
    ...fields.filter(field => field.type === 'phone').map(field => `TEL;TYPE=CELL:${escapeVCard(field.value.trim())}`),
    ...fields.filter(field => field.type === 'email').map(field => `EMAIL;TYPE=INTERNET:${escapeVCard(field.value.trim())}`),
  ];
  return {
    vcard: ['BEGIN:VCARD', 'VERSION:3.0', ...vcardFields, 'END:VCARD'].join('\r\n'),
    text: lines.join('\n'),
  };
}
