import {ShareFileService} from './ShareFileService';

declare const Buffer: {from(input: string, encoding: string): {toString(encoding: string): string}};

test('builds a vCard data URL', () => {
  const service = new ShareFileService();
  const url = service.buildVcardDataUrl({id: 'default', name: 'Personal', fields: [{id: 'name', type: 'text', label: 'Nombre', value: 'Ana Test', shareable: true}]}, ['name']);
  const vcard = Buffer.from(url.split(',')[1], 'base64').toString('utf8');

  expect(url).toMatch(/^data:text\/vcard;base64,/);
  expect(vcard).toContain('BEGIN:VCARD');
  expect(vcard).toContain('Ana Test');
});
