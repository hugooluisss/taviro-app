## Why

Taviro currently stores one contact profile, which prevents a user from keeping separate personal, work, or other shareable identities offline. The app needs a card collection while preserving the existing QR, NFC, and WhatsApp flows.

## What Changes

- Replace the single profile model and storage with an ordered collection of cards.
- Add card creation, editing, duplication, renaming, deletion protection, and legacy-profile migration.
- Make sharing screens operate on an explicitly selected card.
- Keep photo fields editable and previewable, but exclude them from generated vCard/text payloads.
- Replace the profile home/editor with card-list and card-edit screens.

## Capabilities

### New Capabilities
- `multi-card-profiles`: Offline storage and management of multiple contact cards.

### Modified Capabilities
- `share-qr`: Share a selected card and omit photo fields from payloads.
- `share-nfc`: Share a selected card through HCE.
- `share-whatsapp`: Share a selected card as text.

## Impact

Touches the TypeScript model, AsyncStorage repository, business services, React controllers, navigation, and screens under `src/`. Existing `@taviro/profile` data is read once and migrated to `@taviro/cards`; native Android HCE code and dependencies remain unchanged.
