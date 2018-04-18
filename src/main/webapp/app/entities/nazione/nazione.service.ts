import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Nazione } from './nazione.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Nazione>;

@Injectable()
export class NazioneService {

    private resourceUrl =  SERVER_API_URL + 'api/naziones';

    constructor(private http: HttpClient) { }

    create(nazione: Nazione): Observable<EntityResponseType> {
        const copy = this.convert(nazione);
        return this.http.post<Nazione>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(nazione: Nazione): Observable<EntityResponseType> {
        const copy = this.convert(nazione);
        return this.http.put<Nazione>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Nazione>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Nazione[]>> {
        const options = createRequestOption(req);
        return this.http.get<Nazione[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Nazione[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Nazione = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Nazione[]>): HttpResponse<Nazione[]> {
        const jsonResponse: Nazione[] = res.body;
        const body: Nazione[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Nazione.
     */
    private convertItemFromServer(nazione: Nazione): Nazione {
        const copy: Nazione = Object.assign({}, nazione);
        return copy;
    }

    /**
     * Convert a Nazione to a JSON which can be sent to the server.
     */
    private convert(nazione: Nazione): Nazione {
        const copy: Nazione = Object.assign({}, nazione);
        return copy;
    }
}
