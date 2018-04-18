import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAppSharedModule } from '../../shared';
import {
    NazioneService,
    NazionePopupService,
    NazioneComponent,
    NazioneDetailComponent,
    NazioneDialogComponent,
    NazionePopupComponent,
    NazioneDeletePopupComponent,
    NazioneDeleteDialogComponent,
    nazioneRoute,
    nazionePopupRoute,
    NazioneResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...nazioneRoute,
    ...nazionePopupRoute,
];

@NgModule({
    imports: [
        JhipsterAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NazioneComponent,
        NazioneDetailComponent,
        NazioneDialogComponent,
        NazioneDeleteDialogComponent,
        NazionePopupComponent,
        NazioneDeletePopupComponent,
    ],
    entryComponents: [
        NazioneComponent,
        NazioneDialogComponent,
        NazionePopupComponent,
        NazioneDeleteDialogComponent,
        NazioneDeletePopupComponent,
    ],
    providers: [
        NazioneService,
        NazionePopupService,
        NazioneResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAppNazioneModule {}
