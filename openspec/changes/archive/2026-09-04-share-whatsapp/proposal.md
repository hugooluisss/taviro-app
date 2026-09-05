## Why

Users need a familiar text-sharing route for contacts.

## What Changes

- Add selected-field sharing through React Native `Share.share()` or WhatsApp Linking.

## Capabilities

### New Capabilities
- `share-whatsapp`: Share selected contact text with WhatsApp.

### Modified Capabilities

## Impact

Uses native React Native Share/Linking APIs only and consumes `ShareableCardService.buildShareableCard`.
