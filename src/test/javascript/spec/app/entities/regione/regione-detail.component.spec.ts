/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterAppTestModule } from '../../../test.module';
import { RegioneDetailComponent } from '../../../../../../main/webapp/app/entities/regione/regione-detail.component';
import { RegioneService } from '../../../../../../main/webapp/app/entities/regione/regione.service';
import { Regione } from '../../../../../../main/webapp/app/entities/regione/regione.model';

describe('Component Tests', () => {

    describe('Regione Management Detail Component', () => {
        let comp: RegioneDetailComponent;
        let fixture: ComponentFixture<RegioneDetailComponent>;
        let service: RegioneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterAppTestModule],
                declarations: [RegioneDetailComponent],
                providers: [
                    RegioneService
                ]
            })
            .overrideTemplate(RegioneDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegioneDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegioneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Regione(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.regione).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
