import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { Regione } from 'app/shared/model/regione.model';
import { RegioneService } from './regione.service';
import { RegioneComponent } from './regione.component';
import { RegioneDetailComponent } from './regione-detail.component';
import { RegioneUpdateComponent } from './regione-update.component';
import { RegioneDeletePopupComponent } from './regione-delete-dialog.component';

@Injectable()
export class RegioneResolvePagingParams implements Resolve<any> {
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
export class RegioneResolve implements Resolve<any> {
  constructor(private service: RegioneService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id);
    }
    return new Regione();
  }
}

export const regioneRoute: Routes = [
  {
    path: 'regione',
    component: RegioneComponent,
    resolve: {
      pagingParams: RegioneResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regiones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'regione/:id/view',
    component: RegioneDetailComponent,
    resolve: {
      regione: RegioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regiones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'regione/new',
    component: RegioneUpdateComponent,
    resolve: {
      regione: RegioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regiones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'regione/:id/edit',
    component: RegioneUpdateComponent,
    resolve: {
      regione: RegioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regiones'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const regionePopupRoute: Routes = [
  {
    path: 'regione/:id/delete',
    component: RegioneDeletePopupComponent,
    resolve: {
      regione: RegioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Regiones'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
