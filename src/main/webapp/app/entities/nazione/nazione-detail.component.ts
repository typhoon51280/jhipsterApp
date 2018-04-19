import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INazione } from 'app/shared/model/nazione.model';

@Component({
  selector: 'jhi-nazione-detail',
  templateUrl: './nazione-detail.component.html'
})
export class NazioneDetailComponent implements OnInit {
  nazione: INazione;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ nazione }) => {
      this.nazione = nazione.body ? nazione.body : nazione;
    });
  }

  previousState() {
    window.history.back();
  }
}
