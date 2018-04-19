import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { INazione } from 'app/shared/model/nazione.model';
import { NazioneService } from './nazione.service';

@Component({
  selector: 'jhi-nazione-update',
  templateUrl: './nazione-update.component.html'
})
export class NazioneUpdateComponent implements OnInit {
  private _nazione: INazione;
  isSaving: boolean;

  constructor(private nazioneService: NazioneService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ nazione }) => {
      this.nazione = nazione.body ? nazione.body : nazione;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.nazione.id !== undefined) {
      this.subscribeToSaveResponse(this.nazioneService.update(this.nazione));
    } else {
      this.subscribeToSaveResponse(this.nazioneService.create(this.nazione));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<INazione>>) {
    result.subscribe((res: HttpResponse<INazione>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: INazione) {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
  get nazione() {
    return this._nazione;
  }

  set nazione(nazione: INazione) {
    this._nazione = nazione;
  }
}
