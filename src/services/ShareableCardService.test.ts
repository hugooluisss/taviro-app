import {buildShareableCard} from './ShareableCardService';

test('builds a vCard and text from selected fields', () => {
  const result = buildShareableCard({fields: [{id: 'name', label: 'Nombre', value: 'Ana, Test', shareable: true}, {id: 'email', label: 'Email', value: 'ana@example.com', shareable: false}]}, ['name']);
  expect(result.text).toBe('Nombre: Ana, Test');
  expect(result.vcard).toContain('VERSION:3.0');
  expect(result.vcard).toContain('item1.X-NOMBRE:Ana\\, Test');
  expect(result.vcard).not.toContain('ana@example.com');
});
