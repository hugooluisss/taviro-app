import {Profile, SelectedFieldIds} from '../models/profile';

const escapeVCard = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

export function buildShareableCard(profile: Profile, selectedFieldIds: SelectedFieldIds) {
  const fields = profile.fields.filter(field => selectedFieldIds.includes(field.id) && field.value.trim());
  const lines = fields.map(field => `${field.label}: ${field.value.trim()}`);
  const vcardFields = fields.map(field => `item1.X-${escapeVCard(field.label.toUpperCase())}:${escapeVCard(field.value.trim())}`);
  return {
    vcard: ['BEGIN:VCARD', 'VERSION:3.0', ...vcardFields, 'END:VCARD'].join('\r\n'),
    text: lines.join('\n'),
  };
}
