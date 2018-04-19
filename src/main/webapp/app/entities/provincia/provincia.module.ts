import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAppSharedModule } from 'app/shared';
import {
  ProvinciaService,
  ProvinciaComponent,
  ProvinciaDetailComponent,
  ProvinciaUpdateComponent,
  ProvinciaDeletePopupComponent,
  ProvinciaDeleteDialogComponent,
  provinciaRoute,
  provinciaPopupRoute,
  ProvinciaResolve,
  ProvinciaResolvePagingParams
} from './';

const ENTITY_STATES = [...provinciaRoute, ...provinciaPopupRoute];

@NgModule({
  imports: [JhipsterAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProvinciaComponent,
    ProvinciaDetailComponent,
    ProvinciaUpdateComponent,
    ProvinciaDeleteDialogComponent,
    ProvinciaDeletePopupComponent
  ],
  entryComponents: [ProvinciaComponent, ProvinciaUpdateComponent, ProvinciaDeleteDialogComponent, ProvinciaDeletePopupComponent],
  providers: [ProvinciaService, ProvinciaResolve, ProvinciaResolvePagingParams],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAppProvinciaModule {}
