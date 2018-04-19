/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { JhipsterAppTestModule } from '../../../test.module';
import { RegioneDetailComponent } from 'app/entities/regione/regione-detail.component';
import { Regione } from 'app/shared/model/regione.model';

describe('Component Tests', () => {
  describe('Regione Management Detail Component', () => {
    let comp: RegioneDetailComponent;
    let fixture: ComponentFixture<RegioneDetailComponent>;
    const route = ({ data: of({ regione: new Regione(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAppTestModule],
        declarations: [RegioneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RegioneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegioneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.regione).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
