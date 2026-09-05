## 1. Data model and persistence

- [x] 1.1 Replace profile types with Card/CardField/FieldType and SelectedFieldIds.
- [x] 1.2 Add CardRepository and CardService with defaults, migration, CRUD rules, and trimming.
- [x] 1.3 Update service exports and sharing services to use Card.

## 2. Controllers

- [x] 2.1 Add useCardsController and useCardController.
- [x] 2.2 Update QR, NFC, and WhatsApp controllers to accept cardId and load the selected card.

## 3. Screens and navigation

- [x] 3.1 Add CardListScreen and CardEditScreen with field editing, photo preview, and card actions.
- [x] 3.2 Update sharing screens, screen exports, and typed navigation routes.
- [x] 3.3 Remove obsolete profile files after import verification.

## 4. Verification

- [x] 4.1 Update/add service tests for card behavior and photo exclusion.
- [x] 4.2 Run TypeScript, Jest, and ESLint checks.
- [x] 4.3 Validate/archive OpenSpec and commit the completed change.
