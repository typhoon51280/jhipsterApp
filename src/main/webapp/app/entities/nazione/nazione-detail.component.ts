import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Nazione } from './nazione.model';
import { NazioneService } from './nazione.service';

@Component({
    selector: 'jhi-nazione-detail',
    templateUrl: './nazione-detail.component.html'
})
export class NazioneDetailComponent implements OnInit, OnDestroy {

    nazione: Nazione;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nazioneService: NazioneService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNaziones();
    }

    load(id) {
        this.nazioneService.find(id)
            .subscribe((nazioneResponse: HttpResponse<Nazione>) => {
                this.nazione = nazioneResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNaziones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nazioneListModification',
            (response) => this.load(this.nazione.id)
        );
    }
}
