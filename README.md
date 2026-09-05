# Taviro

Android-only, offline React Native app for a personal contact card.

## Layers

- `src/repositories/`: AsyncStorage CRUD only.
- `src/services/`: validation, profile rules, and `buildShareableCard`.
- `src/controllers/`: React hooks orchestrating services.
- `src/screens/`: UI consuming controllers; use `useTheme()` for colors.

The QR, NFC, and WhatsApp proposals are pending implementation. Sharing screens must select field ids and call `buildShareableCard(profile, selectedFieldIds)`.
