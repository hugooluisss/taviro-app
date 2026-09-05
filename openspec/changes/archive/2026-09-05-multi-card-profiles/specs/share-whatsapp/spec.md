## MODIFIED Requirements

### Requirement: Share selected fields with WhatsApp
The WhatsApp screen MUST default to the selected card's shareable fields and invoke `Share.share()` or `whatsapp://send?text=` with the generated plain-text output, without a new sharing library. Photo fields MUST be excluded from the text.

#### Scenario: Share text
- **WHEN** the user taps share for a card
- **THEN** WhatsApp receives only the selected non-photo fields' text
