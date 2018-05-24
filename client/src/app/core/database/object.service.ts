import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';
  import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operator/map';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export abstract class ObjectService<ObjectClass> {



  apiBase = environment.apiBaseUrl;


  url: string;

  protected constructor(private httpClient: HttpClient, objectName: String) {
    this.url = this.apiBase + objectName;
  }


  /** GET heroes from the server */
  getObjects (): Observable<ObjectClass[]> {
    return this.httpClient.get<ObjectClass[]>(this.url)
      .pipe(
        catchError(this.handleError('getObjects', []))
      );
  }

  /** GET object by id. */
  getObjectById(id: string): Observable<ObjectClass> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<ObjectClass>(url)
      .pipe(
        catchError(this.handleError<any>(`getHero id=${id}`))
      );
  }

  getObjectsByQuery(queryParams: any): Observable<ObjectClass[]> {
    return this.httpClient.get<ObjectClass[]>(this.url, {params: queryParams})
      .pipe(
        catchError(this.handleError<any>(`getHero query=${queryParams}`))
      );
  }


  /** POST: addIngredient a new object to the server */
  addObject (object: ObjectClass): Observable<ObjectClass> {
    return this.httpClient.post<ObjectClass>(this.url, object, httpOptions)
      .pipe(
        catchError(this.handleError<ObjectClass>('addObject'))
      );
  }

  /** PUT: update the object on the server */
  putObject (hero: ObjectClass, id: string): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, hero, httpOptions).pipe(
      catchError(this.handleError<any>('updateObject'))
    );
  }

  /** PUT: update the object on the server */
  patchObject (objectData: any, queryObject: any | string): Observable<any> {
    const id = typeof queryObject === 'string' ? queryObject : null;
    let url = this.url;
    const options = httpOptions;
    if (id) {
       url = `${this.url}/${id}`;
    } else {
      options['params'] = queryObject;
    }
    return this.httpClient.patch(url, objectData, options).pipe(
      catchError(this.handleError<any>('updateObject'))
    );
  }
  /** DELETE: delete the object from the server */
  deleteHero (object: ObjectClass | string): Observable<ObjectClass> {
    const id = typeof object === 'string' ? object : object['_id'];
    const url = `${this.url}/${id}`;

    return this.httpClient.delete<ObjectClass>(url, httpOptions).pipe(
      catchError(this.handleError<ObjectClass>('deleteObject'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('HeroService: ' + message);
  }

}
