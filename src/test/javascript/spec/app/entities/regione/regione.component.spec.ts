/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterAppTestModule } from '../../../test.module';
import { RegioneComponent } from '../../../../../../main/webapp/app/entities/regione/regione.component';
import { RegioneService } from '../../../../../../main/webapp/app/entities/regione/regione.service';
import { Regione } from '../../../../../../main/webapp/app/entities/regione/regione.model';

describe('Component Tests', () => {

    describe('Regione Management Component', () => {
        let comp: RegioneComponent;
        let fixture: ComponentFixture<RegioneComponent>;
        let service: RegioneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterAppTestModule],
                declarations: [RegioneComponent],
                providers: [
                    RegioneService
                ]
            })
            .overrideTemplate(RegioneComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegioneComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegioneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Regione(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.regiones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
