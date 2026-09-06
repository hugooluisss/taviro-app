import {buildShareableCard} from './ShareableCardService';

test('builds a vCard and text from selected fields', () => {
  const result = buildShareableCard({id: 'default', name: 'Personal', fields: [
    {id: 'name', type: 'text', label: 'Nombre', value: 'Ana, Test', shareable: true},
    {id: 'phone', type: 'phone', label: 'Teléfono', value: '+52 555 123 4567', shareable: true},
    {id: 'email', type: 'email', label: 'Email', value: 'ana@example.com', shareable: false},
    {id: 'note', type: 'text', label: 'Puesto', value: 'Diseño; Producto', shareable: true},
    {id: 'company', type: 'text', label: 'Empresa', value: 'Taviro', shareable: true},
    {id: 'photo', type: 'photo', label: 'Foto/Logo', value: 'file:///photo.jpg', shareable: true},
  ]}, ['name', 'phone', 'email', 'note', 'company', 'photo']);
  expect(result.text).toBe('Nombre: Ana, Test\nTeléfono: +52 555 123 4567\nEmail: ana@example.com\nPuesto: Diseño; Producto\nEmpresa: Taviro');
  expect(result.vcard).toContain('VERSION:3.0');
  expect(result.vcard).toContain('FN:Ana\\, Test');
  expect(result.vcard).toContain('N:Ana\\, Test;;;;');
  expect(result.vcard).toContain('TEL;TYPE=CELL:+52 555 123 4567');
  expect(result.vcard).toContain('EMAIL;TYPE=INTERNET:ana@example.com');
  expect(result.vcard).toContain('NOTE:Puesto: Diseño\\; Producto\\nEmpresa: Taviro');
  expect(result.vcard).not.toContain('item1.X-');
  expect(result.text).not.toContain('photo.jpg');
});

test('uses the card name when no selected text field exists', () => {
  const result = buildShareableCard({id: 'default', name: 'Personal', fields: [
    {id: 'phone', type: 'phone', label: 'Teléfono', value: '555', shareable: true},
  ]}, ['phone']);

  expect(result.vcard).toContain('FN:Personal');
  expect(result.vcard).toContain('N:Personal;;;;');
});
