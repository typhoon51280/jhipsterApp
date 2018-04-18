import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Regione } from './regione.model';
import { RegionePopupService } from './regione-popup.service';
import { RegioneService } from './regione.service';

@Component({
    selector: 'jhi-regione-delete-dialog',
    templateUrl: './regione-delete-dialog.component.html'
})
export class RegioneDeleteDialogComponent {

    regione: Regione;

    constructor(
        private regioneService: RegioneService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regioneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'regioneListModification',
                content: 'Deleted an regione'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-regione-delete-popup',
    template: ''
})
export class RegioneDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionePopupService: RegionePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.regionePopupService
                .open(RegioneDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
