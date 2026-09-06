/* eslint-disable no-bitwise */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function utf8ToBase64(input: string): string {
  const utf8 = unescape(encodeURIComponent(input));
  let output = '';
  for (let i = 0; i < utf8.length; i += 3) {
    const byte1 = utf8.charCodeAt(i);
    const byte2 = i + 1 < utf8.length ? utf8.charCodeAt(i + 1) : NaN;
    const byte3 = i + 2 < utf8.length ? utf8.charCodeAt(i + 2) : NaN;
    const enc1 = byte1 >> 2;
    const enc2 = ((byte1 & 3) << 4) | (Number.isNaN(byte2) ? 0 : byte2 >> 4);
    const enc3 = Number.isNaN(byte2) ? 64 : (((byte2 & 15) << 2) | (Number.isNaN(byte3) ? 0 : byte3 >> 6));
    const enc4 = Number.isNaN(byte3) ? 64 : (byte3 & 63);
    output += CHARS[enc1] + CHARS[enc2] + (enc3 === 64 ? '=' : CHARS[enc3]) + (enc4 === 64 ? '=' : CHARS[enc4]);
  }
  return output;
}
