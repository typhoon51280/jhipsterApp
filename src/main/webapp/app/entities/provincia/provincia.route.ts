import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { Provincia } from 'app/shared/model/provincia.model';
import { ProvinciaService } from './provincia.service';
import { ProvinciaComponent } from './provincia.component';
import { ProvinciaDetailComponent } from './provincia-detail.component';
import { ProvinciaUpdateComponent } from './provincia-update.component';
import { ProvinciaDeletePopupComponent } from './provincia-delete-dialog.component';

@Injectable()
export class ProvinciaResolvePagingParams implements Resolve<any> {
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
export class ProvinciaResolve implements Resolve<any> {
  constructor(private service: ProvinciaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id);
    }
    return new Provincia();
  }
}

export const provinciaRoute: Routes = [
  {
    path: 'provincia',
    component: ProvinciaComponent,
    resolve: {
      pagingParams: ProvinciaResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Provincias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'provincia/:id/view',
    component: ProvinciaDetailComponent,
    resolve: {
      provincia: ProvinciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Provincias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'provincia/new',
    component: ProvinciaUpdateComponent,
    resolve: {
      provincia: ProvinciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Provincias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'provincia/:id/edit',
    component: ProvinciaUpdateComponent,
    resolve: {
      provincia: ProvinciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Provincias'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const provinciaPopupRoute: Routes = [
  {
    path: 'provincia/:id/delete',
    component: ProvinciaDeletePopupComponent,
    resolve: {
      provincia: ProvinciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Provincias'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
