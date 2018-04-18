import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Regione } from './regione.model';
import { RegioneService } from './regione.service';

@Component({
    selector: 'jhi-regione-detail',
    templateUrl: './regione-detail.component.html'
})
export class RegioneDetailComponent implements OnInit, OnDestroy {

    regione: Regione;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private regioneService: RegioneService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegiones();
    }

    load(id) {
        this.regioneService.find(id)
            .subscribe((regioneResponse: HttpResponse<Regione>) => {
                this.regione = regioneResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegiones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'regioneListModification',
            (response) => this.load(this.regione.id)
        );
    }
}
