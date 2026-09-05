export type FieldType = 'text' | 'phone' | 'email' | 'photo';

export type CardField = {
  id: string;
  type: FieldType;
  label: string;
  value: string;
  shareable: boolean;
};

export type Card = {
  id: string;
  name: string;
  fields: CardField[];
};

export type SelectedFieldIds = string[];
