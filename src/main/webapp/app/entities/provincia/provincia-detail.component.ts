import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvincia } from 'app/shared/model/provincia.model';

@Component({
  selector: 'jhi-provincia-detail',
  templateUrl: './provincia-detail.component.html'
})
export class ProvinciaDetailComponent implements OnInit {
  provincia: IProvincia;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ provincia }) => {
      this.provincia = provincia.body ? provincia.body : provincia;
    });
  }

  previousState() {
    window.history.back();
  }
}
