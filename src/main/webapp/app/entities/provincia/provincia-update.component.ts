import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IProvincia } from 'app/shared/model/provincia.model';
import { ProvinciaService } from './provincia.service';
import { IRegione } from 'app/shared/model/regione.model';
import { RegioneService } from 'app/entities/regione';

@Component({
  selector: 'jhi-provincia-update',
  templateUrl: './provincia-update.component.html'
})
export class ProvinciaUpdateComponent implements OnInit {
  private _provincia: IProvincia;
  isSaving: boolean;

  regiones: IRegione[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private provinciaService: ProvinciaService,
    private regioneService: RegioneService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ provincia }) => {
      this.provincia = provincia.body ? provincia.body : provincia;
    });
    this.regioneService.query().subscribe(
      (res: HttpResponse<IRegione[]>) => {
        this.regiones = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.provincia.id !== undefined) {
      this.subscribeToSaveResponse(this.provinciaService.update(this.provincia));
    } else {
      this.subscribeToSaveResponse(this.provinciaService.create(this.provincia));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IProvincia>>) {
    result.subscribe((res: HttpResponse<IProvincia>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: IProvincia) {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRegioneById(index: number, item: IRegione) {
    return item.id;
  }
  get provincia() {
    return this._provincia;
  }

  set provincia(provincia: IProvincia) {
    this._provincia = provincia;
  }
}
