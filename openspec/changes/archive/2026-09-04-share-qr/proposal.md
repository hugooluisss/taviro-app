## Why

Users need to send selected contact fields as a QR code.

## What Changes

- Add a field-selection screen and QR rendering for the generated vCard.

## Capabilities

### New Capabilities
- `share-qr`: Select fields and display their vCard as QR.

### Modified Capabilities

## Impact

Consumes `ShareableCardService.buildShareableCard`; QR implementation remains pending.
