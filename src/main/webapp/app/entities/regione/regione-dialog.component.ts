import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Regione } from './regione.model';
import { RegionePopupService } from './regione-popup.service';
import { RegioneService } from './regione.service';
import { Nazione, NazioneService } from '../nazione';

@Component({
    selector: 'jhi-regione-dialog',
    templateUrl: './regione-dialog.component.html'
})
export class RegioneDialogComponent implements OnInit {

    regione: Regione;
    isSaving: boolean;

    naziones: Nazione[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private regioneService: RegioneService,
        private nazioneService: NazioneService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.nazioneService.query()
            .subscribe((res: HttpResponse<Nazione[]>) => { this.naziones = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.regione.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regioneService.update(this.regione));
        } else {
            this.subscribeToSaveResponse(
                this.regioneService.create(this.regione));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Regione>>) {
        result.subscribe((res: HttpResponse<Regione>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Regione) {
        this.eventManager.broadcast({ name: 'regioneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNazioneById(index: number, item: Nazione) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-regione-popup',
    template: ''
})
export class RegionePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionePopupService: RegionePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.regionePopupService
                    .open(RegioneDialogComponent as Component, params['id']);
            } else {
                this.regionePopupService
                    .open(RegioneDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
