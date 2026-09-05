## MODIFIED Requirements

### Requirement: Share selected fields by QR
The QR screen MUST default to the selected card's shareable fields, allow checkbox changes, and display a QR encoding the resulting vCard. Photo fields MUST be excluded from the vCard.

#### Scenario: Generate QR
- **WHEN** the user confirms selected fields for a card
- **THEN** the QR encodes `ShareableCardService.buildShareableCard`'s `vcard` output without photo fields
