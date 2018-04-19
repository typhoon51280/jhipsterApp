import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvincia } from 'app/shared/model/provincia.model';
import { ProvinciaService } from './provincia.service';

@Component({
  selector: 'jhi-provincia-delete-dialog',
  templateUrl: './provincia-delete-dialog.component.html'
})
export class ProvinciaDeleteDialogComponent {
  provincia: IProvincia;

  constructor(private provinciaService: ProvinciaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.provinciaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'provinciaListModification',
        content: 'Deleted an provincia'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-provincia-delete-popup',
  template: ''
})
export class ProvinciaDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.route.data.subscribe(({ provincia }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProvinciaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.provincia = provincia.body;
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
