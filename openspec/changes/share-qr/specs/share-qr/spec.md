## ADDED Requirements

### Requirement: Share selected fields by QR
The QR screen MUST default to the profile's shareable fields, allow checkbox changes, and display a QR encoding the resulting vCard.

#### Scenario: Generate QR
- **WHEN** the user confirms selected fields
- **THEN** the QR encodes `ShareableCardService.buildShareableCard`'s `vcard` output
