import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegione } from 'app/shared/model/regione.model';

@Component({
  selector: 'jhi-regione-detail',
  templateUrl: './regione-detail.component.html'
})
export class RegioneDetailComponent implements OnInit {
  regione: IRegione;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ regione }) => {
      this.regione = regione.body ? regione.body : regione;
    });
  }

  previousState() {
    window.history.back();
  }
}
