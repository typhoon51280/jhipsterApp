import { IRegione } from './regione.model';

export interface INazione {
  id?: number;
  nome?: string;
  prefisso?: string;
  codice?: string;
  codiceLingua?: string;
  regionis?: IRegione[];
}

export class Nazione implements INazione {
  constructor(
    public id?: number,
    public nome?: string,
    public prefisso?: string,
    public codice?: string,
    public codiceLingua?: string,
    public regionis?: IRegione[]
  ) {}
}
