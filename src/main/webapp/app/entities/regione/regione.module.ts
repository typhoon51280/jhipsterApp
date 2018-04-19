import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAppSharedModule } from 'app/shared';
import {
  RegioneService,
  RegioneComponent,
  RegioneDetailComponent,
  RegioneUpdateComponent,
  RegioneDeletePopupComponent,
  RegioneDeleteDialogComponent,
  regioneRoute,
  regionePopupRoute,
  RegioneResolve,
  RegioneResolvePagingParams
} from './';

const ENTITY_STATES = [...regioneRoute, ...regionePopupRoute];

@NgModule({
  imports: [JhipsterAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RegioneComponent,
    RegioneDetailComponent,
    RegioneUpdateComponent,
    RegioneDeleteDialogComponent,
    RegioneDeletePopupComponent
  ],
  entryComponents: [RegioneComponent, RegioneUpdateComponent, RegioneDeleteDialogComponent, RegioneDeletePopupComponent],
  providers: [RegioneService, RegioneResolve, RegioneResolvePagingParams],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAppRegioneModule {}
