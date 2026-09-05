## Why

Users need contact sharing by tapping NFC-capable phones.

## What Changes

- Add selected-field sharing through Android NFC Host Card Emulation, emission only.

## Capabilities

### New Capabilities
- `share-nfc`: Emit the selected vCard via NFC HCE.

### Modified Capabilities

## Impact

Requires Android HCE service integration and consumes `ShareableCardService.buildShareableCard`.
