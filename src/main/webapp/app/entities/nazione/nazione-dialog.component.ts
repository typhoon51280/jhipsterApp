import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Nazione } from './nazione.model';
import { NazionePopupService } from './nazione-popup.service';
import { NazioneService } from './nazione.service';

@Component({
    selector: 'jhi-nazione-dialog',
    templateUrl: './nazione-dialog.component.html'
})
export class NazioneDialogComponent implements OnInit {

    nazione: Nazione;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private nazioneService: NazioneService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.nazione.id !== undefined) {
            this.subscribeToSaveResponse(
                this.nazioneService.update(this.nazione));
        } else {
            this.subscribeToSaveResponse(
                this.nazioneService.create(this.nazione));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Nazione>>) {
        result.subscribe((res: HttpResponse<Nazione>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Nazione) {
        this.eventManager.broadcast({ name: 'nazioneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-nazione-popup',
    template: ''
})
export class NazionePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nazionePopupService: NazionePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nazionePopupService
                    .open(NazioneDialogComponent as Component, params['id']);
            } else {
                this.nazionePopupService
                    .open(NazioneDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
