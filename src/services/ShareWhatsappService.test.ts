import {ShareWhatsappService} from './ShareWhatsappService';

test('builds text and an encoded WhatsApp URL', () => {
  const service = new ShareWhatsappService();
  const text = service.buildText({id: 'default', name: 'Personal', fields: [{id: 'name', type: 'text', label: 'Nombre', value: 'Ana Test', shareable: true}]}, ['name']);

  expect(text).toBe('Nombre: Ana Test');
  expect(service.buildWhatsappUrl(text)).toBe('whatsapp://send?text=Nombre%3A%20Ana%20Test');
});
