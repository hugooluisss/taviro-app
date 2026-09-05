import {buildShareableCard} from './ShareableCardService';

test('builds a vCard and text from selected fields', () => {
  const result = buildShareableCard({id: 'default', name: 'Personal', fields: [{id: 'name', type: 'text', label: 'Nombre', value: 'Ana, Test', shareable: true}, {id: 'email', type: 'email', label: 'Email', value: 'ana@example.com', shareable: false}, {id: 'photo', type: 'photo', label: 'Foto/Logo', value: 'file:///photo.jpg', shareable: true}]}, ['name', 'photo']);
  expect(result.text).toBe('Nombre: Ana, Test');
  expect(result.vcard).toContain('VERSION:3.0');
  expect(result.vcard).toContain('item1.X-NOMBRE:Ana\\, Test');
  expect(result.vcard).not.toContain('ana@example.com');
  expect(result.text).not.toContain('photo.jpg');
});
