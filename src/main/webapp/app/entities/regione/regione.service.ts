import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRegione } from 'app/shared/model/regione.model';

export type EntityResponseType = HttpResponse<IRegione>;
export type EntityArrayResponseType = HttpResponse<IRegione[]>;

@Injectable()
export class RegioneService {
  private resourceUrl = SERVER_API_URL + 'api/regiones';

  constructor(private http: HttpClient) {}

  create(regione: IRegione): Observable<EntityResponseType> {
    const copy = this.convert(regione);
    return this.http
      .post<IRegione>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(regione: IRegione): Observable<EntityResponseType> {
    const copy = this.convert(regione);
    return this.http
      .put<IRegione>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRegione>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegione[]>(this.resourceUrl, { params: options, observe: 'response' })
      .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: IRegione = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
    const jsonResponse: IRegione[] = res.body;
    const body: IRegione[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to Regione.
   */
  private convertItemFromServer(regione: IRegione): IRegione {
    const copy: IRegione = Object.assign({}, regione, {});
    return copy;
  }

  /**
   * Convert a Regione to a JSON which can be sent to the server.
   */
  private convert(regione: IRegione): IRegione {
    const copy: IRegione = Object.assign({}, regione, {});
    return copy;
  }
}
