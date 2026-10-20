export interface Melding {
  id: string;
  titel: string;
  categorie: string;
  status: Status;
  datum: string;
  omschrijving: string;
}

export enum Status {
  Nieuw = 'Nieuw',
  InBehandeling = 'In behandeling',
  Afgehandeld = 'Afgehandeld',
}
