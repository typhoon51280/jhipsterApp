/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterAppTestModule } from '../../../test.module';
import { RegioneUpdateComponent } from 'app/entities/regione/regione-update.component';
import { RegioneService } from 'app/entities/regione/regione.service';
import { Regione } from 'app/shared/model/regione.model';

import { NazioneService } from 'app/entities/nazione';

describe('Component Tests', () => {
  describe('Regione Management Update Component', () => {
    let comp: RegioneUpdateComponent;
    let fixture: ComponentFixture<RegioneUpdateComponent>;
    let service: RegioneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAppTestModule],
        declarations: [RegioneUpdateComponent],
        providers: [NazioneService, RegioneService]
      })
        .overrideTemplate(RegioneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegioneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegioneService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new Regione(123);
          spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.regione = entity;
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
          const entity = new Regione();
          spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.regione = entity;
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
