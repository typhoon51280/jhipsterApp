import { BaseEntity } from './../../shared';

export class Regione implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public abitanti?: number,
        public area?: number,
        public provinces?: BaseEntity[],
        public nazione?: BaseEntity,
    ) {
    }
}
