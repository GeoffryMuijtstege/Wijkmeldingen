export interface Melding {
  id: number;
  titel: string;
  categorie: string;
  status: Status;
  datum: string;
  omschrijving: string;
}

export enum Status {
  Nieuw = 'nieuw',
  InBehandeling = 'in behandeling',
  Afgehandeld = 'afgehandeld',
}
