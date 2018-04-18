import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RegioneComponent } from './regione.component';
import { RegioneDetailComponent } from './regione-detail.component';
import { RegionePopupComponent } from './regione-dialog.component';
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

export const regioneRoute: Routes = [
    {
        path: 'regione',
        component: RegioneComponent,
        resolve: {
            'pagingParams': RegioneResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regiones'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'regione/:id',
        component: RegioneDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regiones'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regionePopupRoute: Routes = [
    {
        path: 'regione-new',
        component: RegionePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regiones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'regione/:id/edit',
        component: RegionePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regiones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'regione/:id/delete',
        component: RegioneDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regiones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
