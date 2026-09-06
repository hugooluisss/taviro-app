import {utf8ToBase64} from './base64';

declare const Buffer: {from(input: string, encoding: string): {toString(encoding: string): string}};

test('encodes UTF-8 as base64', () => {
  const value = 'Hola, señor 👋';
  expect(Buffer.from(utf8ToBase64(value), 'base64').toString('utf8')).toBe(value);
});
