import { BaseEntity } from './../../shared';

export class Provincia implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public prefisso?: string,
        public codice?: string,
        public abitanti?: number,
        public area?: number,
        public regione?: BaseEntity,
    ) {
    }
}
