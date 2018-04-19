/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterAppTestModule } from '../../../test.module';
import { ProvinciaUpdateComponent } from 'app/entities/provincia/provincia-update.component';
import { ProvinciaService } from 'app/entities/provincia/provincia.service';
import { Provincia } from 'app/shared/model/provincia.model';

import { RegioneService } from 'app/entities/regione';

describe('Component Tests', () => {
  describe('Provincia Management Update Component', () => {
    let comp: ProvinciaUpdateComponent;
    let fixture: ComponentFixture<ProvinciaUpdateComponent>;
    let service: ProvinciaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAppTestModule],
        declarations: [ProvinciaUpdateComponent],
        providers: [RegioneService, ProvinciaService]
      })
        .overrideTemplate(ProvinciaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvinciaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvinciaService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new Provincia(123);
          spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.provincia = entity;
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
          const entity = new Provincia();
          spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.provincia = entity;
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
