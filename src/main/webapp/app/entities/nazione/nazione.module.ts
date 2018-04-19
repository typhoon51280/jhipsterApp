import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterAppSharedModule } from 'app/shared';
import {
  NazioneService,
  NazioneComponent,
  NazioneDetailComponent,
  NazioneUpdateComponent,
  NazioneDeletePopupComponent,
  NazioneDeleteDialogComponent,
  nazioneRoute,
  nazionePopupRoute,
  NazioneResolve,
  NazioneResolvePagingParams
} from './';

const ENTITY_STATES = [...nazioneRoute, ...nazionePopupRoute];

@NgModule({
  imports: [JhipsterAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NazioneComponent,
    NazioneDetailComponent,
    NazioneUpdateComponent,
    NazioneDeleteDialogComponent,
    NazioneDeletePopupComponent
  ],
  entryComponents: [NazioneComponent, NazioneUpdateComponent, NazioneDeleteDialogComponent, NazioneDeletePopupComponent],
  providers: [NazioneService, NazioneResolve, NazioneResolvePagingParams],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAppNazioneModule {}
