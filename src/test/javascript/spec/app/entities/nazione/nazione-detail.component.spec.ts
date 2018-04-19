/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { JhipsterAppTestModule } from '../../../test.module';
import { NazioneDetailComponent } from 'app/entities/nazione/nazione-detail.component';
import { Nazione } from 'app/shared/model/nazione.model';

describe('Component Tests', () => {
  describe('Nazione Management Detail Component', () => {
    let comp: NazioneDetailComponent;
    let fixture: ComponentFixture<NazioneDetailComponent>;
    const route = ({ data: of({ nazione: new Nazione(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterAppTestModule],
        declarations: [NazioneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NazioneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NazioneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nazione).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
