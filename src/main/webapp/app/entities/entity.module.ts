import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterAppNazioneModule } from './nazione/nazione.module';
import { JhipsterAppRegioneModule } from './regione/regione.module';
import { JhipsterAppProvinciaModule } from './provincia/provincia.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterAppNazioneModule,
        JhipsterAppRegioneModule,
        JhipsterAppProvinciaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAppEntityModule {}
