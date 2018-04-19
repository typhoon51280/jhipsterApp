/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAppTestModule } from '../../../test.module';
import { NazioneDeleteDialogComponent } from 'app/entities/nazione/nazione-delete-dialog.component';
import { NazioneService } from 'app/entities/nazione/nazione.service';

describe('Component Tests', () => {
  describe('Nazione Management Delete Component', () => {
    let comp: NazioneDeleteDialogComponent;
    let fixture: ComponentFixture<NazioneDeleteDialogComponent>;
    let service: NazioneService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAppTestModule],
        declarations: [NazioneDeleteDialogComponent],
        providers: [NazioneService]
      })
        .overrideTemplate(NazioneDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NazioneDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NazioneService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it(
        'Should call delete service on confirmDelete',
        inject(
          [],
          fakeAsync(() => {
            // GIVEN
            spyOn(service, 'delete').and.returnValue(Observable.of({}));

            // WHEN
            comp.confirmDelete(123);
            tick();

            // THEN
            expect(service.delete).toHaveBeenCalledWith(123);
            expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
            expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
          })
        )
      );
    });
  });
});
