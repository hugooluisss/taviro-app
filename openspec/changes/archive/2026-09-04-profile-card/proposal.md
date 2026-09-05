## Why

Taviro needs one offline source of truth for a personal contact card before any sharing channel can consume it.

## What Changes

- Add a dynamic contact-field profile persisted locally with AsyncStorage.
- Add profile editing, custom fields, shareable-field defaults, and vCard/text generation.
- Enforce repository/service/controller/screen layers.

## Capabilities

### New Capabilities
- `profile-card`: Offline editable personal contact card.

### Modified Capabilities

## Impact

Adds TypeScript source under `src/`, AsyncStorage, and the shared card-generation contract.
