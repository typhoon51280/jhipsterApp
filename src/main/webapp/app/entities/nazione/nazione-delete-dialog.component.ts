import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Nazione } from './nazione.model';
import { NazionePopupService } from './nazione-popup.service';
import { NazioneService } from './nazione.service';

@Component({
    selector: 'jhi-nazione-delete-dialog',
    templateUrl: './nazione-delete-dialog.component.html'
})
export class NazioneDeleteDialogComponent {

    nazione: Nazione;

    constructor(
        private nazioneService: NazioneService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nazioneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'nazioneListModification',
                content: 'Deleted an nazione'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nazione-delete-popup',
    template: ''
})
export class NazioneDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nazionePopupService: NazionePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.nazionePopupService
                .open(NazioneDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
