import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProvincia } from 'app/shared/model/provincia.model';

export type EntityResponseType = HttpResponse<IProvincia>;
export type EntityArrayResponseType = HttpResponse<IProvincia[]>;

@Injectable()
export class ProvinciaService {
  private resourceUrl = SERVER_API_URL + 'api/provincias';

  constructor(private http: HttpClient) {}

  create(provincia: IProvincia): Observable<EntityResponseType> {
    const copy = this.convert(provincia);
    return this.http
      .post<IProvincia>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  update(provincia: IProvincia): Observable<EntityResponseType> {
    const copy = this.convert(provincia);
    return this.http
      .put<IProvincia>(this.resourceUrl, copy, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProvincia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertResponse(res));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProvincia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: IProvincia = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
    const jsonResponse: IProvincia[] = res.body;
    const body: IProvincia[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to Provincia.
   */
  private convertItemFromServer(provincia: IProvincia): IProvincia {
    const copy: IProvincia = Object.assign({}, provincia, {});
    return copy;
  }

  /**
   * Convert a Provincia to a JSON which can be sent to the server.
   */
  private convert(provincia: IProvincia): IProvincia {
    const copy: IProvincia = Object.assign({}, provincia, {});
    return copy;
  }
}
