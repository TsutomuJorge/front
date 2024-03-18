import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApi = environment.urlApi;

  constructor(public httpClient: HttpClient) {}

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as 'response',
    };
  }

  public getFile(path: string) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    headers.append('ContentType', 'application/json');
    return this.httpClient
      .get(this.urlApi + path, {
        responseType: 'blob',
        headers,
      })
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  public exportFile(path: string, body: any) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    headers.append('ContentType', 'application/json');
    return this.httpClient
      .post(this.urlApi + path, body, {
        responseType: 'blob',
        headers,
      })
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  public importAndExportResultFile(path: string, body: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient
      .post(this.urlApi + path, body, {
        responseType: 'blob',
        headers,
      })
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  /**
   * Generic GET Method
   * @param path URL path
   */
  public get(path: string): Observable<any> {
    return this.httpClient
      .get(this.urlApi + path, this.getOptions())
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  /**
   * Generic POST Method
   * @param path URL path
   * @param body Request body
   */
  public post(path: string, body: any): Observable<any> {
    return this.httpClient
      .post(this.urlApi + path, JSON.stringify(body), this.getOptions())
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  /**
   * Generic POST Method
   * @param path URL path
   * @param body Request body
   */
  public postWithOptions(
    path: string,
    body: any,
    options: any
  ): Observable<any> {
    return this.httpClient
      .post(this.urlApi + path, body, options)
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  /**
   * Generic PUT Method
   * @param path URL path
   * @param body Request body
   */
  public put(path: string, body: any): Observable<any> {
    return this.httpClient
      .put(this.urlApi + path, JSON.stringify(body), this.getOptions())
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  /**
   * Generic PATCH Method
   * @param path URL path
   * @param body Request body
   */
  public patch(path: string, body: any): Observable<any> {
    return this.httpClient
      .patch(this.urlApi + path, JSON.stringify(body), this.getOptions())
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }

  /**
   * Generic DELETE Method
   * @param path URL path
   */
  public delete(path: string): Observable<any> {
    return this.httpClient
      .delete(this.urlApi + path, this.getOptions())
      .pipe(catchError((e: HttpErrorResponse) => throwError(e)));
  }
}
