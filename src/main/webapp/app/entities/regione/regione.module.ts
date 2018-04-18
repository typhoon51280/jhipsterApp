import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAppSharedModule } from '../../shared';
import {
    RegioneService,
    RegionePopupService,
    RegioneComponent,
    RegioneDetailComponent,
    RegioneDialogComponent,
    RegionePopupComponent,
    RegioneDeletePopupComponent,
    RegioneDeleteDialogComponent,
    regioneRoute,
    regionePopupRoute,
    RegioneResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...regioneRoute,
    ...regionePopupRoute,
];

@NgModule({
    imports: [
        JhipsterAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegioneComponent,
        RegioneDetailComponent,
        RegioneDialogComponent,
        RegioneDeleteDialogComponent,
        RegionePopupComponent,
        RegioneDeletePopupComponent,
    ],
    entryComponents: [
        RegioneComponent,
        RegioneDialogComponent,
        RegionePopupComponent,
        RegioneDeleteDialogComponent,
        RegioneDeletePopupComponent,
    ],
    providers: [
        RegioneService,
        RegionePopupService,
        RegioneResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAppRegioneModule {}
