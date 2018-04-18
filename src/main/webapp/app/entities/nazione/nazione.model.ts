import { BaseEntity } from './../../shared';

export class Nazione implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public prefisso?: string,
        public codice?: string,
        public codiceLingua?: string,
        public regionis?: BaseEntity[],
    ) {
    }
}
