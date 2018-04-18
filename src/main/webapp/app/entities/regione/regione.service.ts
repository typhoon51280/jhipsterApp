import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Regione } from './regione.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Regione>;

@Injectable()
export class RegioneService {

    private resourceUrl =  SERVER_API_URL + 'api/regiones';

    constructor(private http: HttpClient) { }

    create(regione: Regione): Observable<EntityResponseType> {
        const copy = this.convert(regione);
        return this.http.post<Regione>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(regione: Regione): Observable<EntityResponseType> {
        const copy = this.convert(regione);
        return this.http.put<Regione>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Regione>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Regione[]>> {
        const options = createRequestOption(req);
        return this.http.get<Regione[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Regione[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Regione = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Regione[]>): HttpResponse<Regione[]> {
        const jsonResponse: Regione[] = res.body;
        const body: Regione[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Regione.
     */
    private convertItemFromServer(regione: Regione): Regione {
        const copy: Regione = Object.assign({}, regione);
        return copy;
    }

    /**
     * Convert a Regione to a JSON which can be sent to the server.
     */
    private convert(regione: Regione): Regione {
        const copy: Regione = Object.assign({}, regione);
        return copy;
    }
}
