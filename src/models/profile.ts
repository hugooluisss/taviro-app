export type ProfileField = {
  id: string;
  label: string;
  value: string;
  shareable: boolean;
};

export type Profile = {
  fields: ProfileField[];
  photoUri?: string;
};

export type SelectedFieldIds = string[];
