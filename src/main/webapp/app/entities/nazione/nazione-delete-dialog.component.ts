import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INazione } from 'app/shared/model/nazione.model';
import { NazioneService } from './nazione.service';

@Component({
  selector: 'jhi-nazione-delete-dialog',
  templateUrl: './nazione-delete-dialog.component.html'
})
export class NazioneDeleteDialogComponent {
  nazione: INazione;

  constructor(private nazioneService: NazioneService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.nazioneService.delete(id).subscribe(response => {
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
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.data.subscribe(({ nazione }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NazioneDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.nazione = nazione.body;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
