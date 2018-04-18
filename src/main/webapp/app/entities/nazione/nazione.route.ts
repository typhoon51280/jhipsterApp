import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { NazioneComponent } from './nazione.component';
import { NazioneDetailComponent } from './nazione-detail.component';
import { NazionePopupComponent } from './nazione-dialog.component';
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

export const nazioneRoute: Routes = [
    {
        path: 'nazione',
        component: NazioneComponent,
        resolve: {
            'pagingParams': NazioneResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naziones'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'nazione/:id',
        component: NazioneDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naziones'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nazionePopupRoute: Routes = [
    {
        path: 'nazione-new',
        component: NazionePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naziones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nazione/:id/edit',
        component: NazionePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naziones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nazione/:id/delete',
        component: NazioneDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naziones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
