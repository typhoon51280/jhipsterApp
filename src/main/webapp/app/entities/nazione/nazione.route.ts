import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { Nazione } from 'app/shared/model/nazione.model';
import { NazioneService } from './nazione.service';
import { NazioneComponent } from './nazione.component';
import { NazioneDetailComponent } from './nazione-detail.component';
import { NazioneUpdateComponent } from './nazione-update.component';
import { NazioneDeletePopupComponent } from './nazione-delete-dialog.component';

@Injectable()
export class NazioneResolvePagingParams implements Resolve<any> {
  constructor(private paginationUtil: JhiPaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
    return {
      page: this.paginationUtil.parsePage(page),
      predicate: this.paginationUtil.parsePredicate(sort),
      ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

@Injectable()
export class NazioneResolve implements Resolve<any> {
  constructor(private service: NazioneService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id);
    }
    return new Nazione();
  }
}

export const nazioneRoute: Routes = [
  {
    path: 'nazione',
    component: NazioneComponent,
    resolve: {
      pagingParams: NazioneResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Naziones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'nazione/:id/view',
    component: NazioneDetailComponent,
    resolve: {
      nazione: NazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Naziones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'nazione/new',
    component: NazioneUpdateComponent,
    resolve: {
      nazione: NazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Naziones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'nazione/:id/edit',
    component: NazioneUpdateComponent,
    resolve: {
      nazione: NazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Naziones'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nazionePopupRoute: Routes = [
  {
    path: 'nazione/:id/delete',
    component: NazioneDeletePopupComponent,
    resolve: {
      nazione: NazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Naziones'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
