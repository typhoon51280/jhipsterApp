import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INazione } from 'app/shared/model/nazione.model';

export type EntityResponseType = HttpResponse<INazione>;
export type EntityArrayResponseType = HttpResponse<INazione[]>;

@Injectable()
export class NazioneService {
  private resourceUrl = SERVER_API_URL + 'api/naziones';

  constructor(private http: HttpClient) {}

  create(nazione: INazione): Observable<EntityResponseType> {
    const copy = this.convert(nazione);
    return this.http
      .post<INazione>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(nazione: INazione): Observable<EntityResponseType> {
    const copy = this.convert(nazione);
    return this.http
      .put<INazione>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INazione>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INazione[]>(this.resourceUrl, { params: options, observe: 'response' })
      .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: INazione = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
    const jsonResponse: INazione[] = res.body;
    const body: INazione[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to Nazione.
   */
  private convertItemFromServer(nazione: INazione): INazione {
    const copy: INazione = Object.assign({}, nazione, {});
    return copy;
  }

  /**
   * Convert a Nazione to a JSON which can be sent to the server.
   */
  private convert(nazione: INazione): INazione {
    const copy: INazione = Object.assign({}, nazione, {});
    return copy;
  }
}
