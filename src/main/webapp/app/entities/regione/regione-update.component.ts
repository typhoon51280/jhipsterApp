import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IRegione } from 'app/shared/model/regione.model';
import { RegioneService } from './regione.service';
import { INazione } from 'app/shared/model/nazione.model';
import { NazioneService } from 'app/entities/nazione';

@Component({
  selector: 'jhi-regione-update',
  templateUrl: './regione-update.component.html'
})
export class RegioneUpdateComponent implements OnInit {
  private _regione: IRegione;
  isSaving: boolean;

  naziones: INazione[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private regioneService: RegioneService,
    private nazioneService: NazioneService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ regione }) => {
      this.regione = regione.body ? regione.body : regione;
    });
    this.nazioneService.query().subscribe(
      (res: HttpResponse<INazione[]>) => {
        this.naziones = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.regione.id !== undefined) {
      this.subscribeToSaveResponse(this.regioneService.update(this.regione));
    } else {
      this.subscribeToSaveResponse(this.regioneService.create(this.regione));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IRegione>>) {
    result.subscribe((res: HttpResponse<IRegione>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: IRegione) {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackNazioneById(index: number, item: INazione) {
    return item.id;
  }
  get regione() {
    return this._regione;
  }

  set regione(regione: IRegione) {
    this._regione = regione;
  }
}
