/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterAppTestModule } from '../../../test.module';
import { NazioneUpdateComponent } from 'app/entities/nazione/nazione-update.component';
import { NazioneService } from 'app/entities/nazione/nazione.service';
import { Nazione } from 'app/shared/model/nazione.model';

describe('Component Tests', () => {
  describe('Nazione Management Update Component', () => {
    let comp: NazioneUpdateComponent;
    let fixture: ComponentFixture<NazioneUpdateComponent>;
    let service: NazioneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAppTestModule],
        declarations: [NazioneUpdateComponent],
        providers: [NazioneService]
      })
        .overrideTemplate(NazioneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NazioneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NazioneService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new Nazione(123);
          spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.nazione = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );

      it(
        'Should call create service on save for new entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new Nazione();
          spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.nazione = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );
    });
  });
});
