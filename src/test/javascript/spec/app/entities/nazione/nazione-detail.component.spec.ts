/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterAppTestModule } from '../../../test.module';
import { NazioneDetailComponent } from '../../../../../../main/webapp/app/entities/nazione/nazione-detail.component';
import { NazioneService } from '../../../../../../main/webapp/app/entities/nazione/nazione.service';
import { Nazione } from '../../../../../../main/webapp/app/entities/nazione/nazione.model';

describe('Component Tests', () => {

    describe('Nazione Management Detail Component', () => {
        let comp: NazioneDetailComponent;
        let fixture: ComponentFixture<NazioneDetailComponent>;
        let service: NazioneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterAppTestModule],
                declarations: [NazioneDetailComponent],
                providers: [
                    NazioneService
                ]
            })
            .overrideTemplate(NazioneDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NazioneDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NazioneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Nazione(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.nazione).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
