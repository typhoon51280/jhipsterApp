/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAppTestModule } from '../../../test.module';
import { NazioneComponent } from '../../../../../../main/webapp/app/entities/nazione/nazione.component';
import { NazioneService } from '../../../../../../main/webapp/app/entities/nazione/nazione.service';
import { Nazione } from '../../../../../../main/webapp/app/entities/nazione/nazione.model';

describe('Component Tests', () => {

    describe('Nazione Management Component', () => {
        let comp: NazioneComponent;
        let fixture: ComponentFixture<NazioneComponent>;
        let service: NazioneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterAppTestModule],
                declarations: [NazioneComponent],
                providers: [
                    NazioneService
                ]
            })
            .overrideTemplate(NazioneComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NazioneComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NazioneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Nazione(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.naziones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
