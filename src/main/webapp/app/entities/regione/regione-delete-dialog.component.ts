import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegione } from 'app/shared/model/regione.model';
import { RegioneService } from './regione.service';

@Component({
  selector: 'jhi-regione-delete-dialog',
  templateUrl: './regione-delete-dialog.component.html'
})
export class RegioneDeleteDialogComponent {
  regione: IRegione;

  constructor(private regioneService: RegioneService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.regioneService.delete(id).subscribe(response => {
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
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.data.subscribe(({ regione }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RegioneDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.regione = regione.body;
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
