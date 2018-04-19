/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterAppTestModule } from '../../../test.module';
import { ProvinciaDeleteDialogComponent } from 'app/entities/provincia/provincia-delete-dialog.component';
import { ProvinciaService } from 'app/entities/provincia/provincia.service';

describe('Component Tests', () => {
  describe('Provincia Management Delete Component', () => {
    let comp: ProvinciaDeleteDialogComponent;
    let fixture: ComponentFixture<ProvinciaDeleteDialogComponent>;
    let service: ProvinciaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAppTestModule],
        declarations: [ProvinciaDeleteDialogComponent],
        providers: [ProvinciaService]
      })
        .overrideTemplate(ProvinciaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProvinciaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvinciaService);
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
