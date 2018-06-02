import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';




const httpOptions = {
  // Set content-type headers to JSON for CRUD-oberations
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export abstract class ObjectService<ObjectClass> {

  // The base url to the server: In dev environment it is localhost. In production it's live url on google cloud
  apiBase = environment.apiBaseUrl;

 // The url to the objects, ex. https://server.com/recipies
  url: string;

  protected constructor(private httpClient: HttpClient, objectName: String) {
    // Add the object name to the base url to form the url to the object
    this.url = this.apiBase + objectName;
  }


  // GET Objects from the server
  getObjects (): Observable<ObjectClass[]> {
    return this.httpClient.get<ObjectClass[]>(this.url)
      .pipe(
        catchError(this.handleError('getObjects', []))
      );
  }

  // GET object by id.
  getObjectById(id: string): Observable<ObjectClass> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<ObjectClass>(url)
      .pipe(
        catchError(this.handleError<any>(`getObject id=${id}`))
      );
  }

  // GET objects by query params, ex. ?name="John"&email="email@email.com"
  getObjectsByQuery(queryParams: any): Observable<ObjectClass[]> {
    return this.httpClient.get<ObjectClass[]>(this.url, {params: queryParams})
      .pipe(
        catchError(this.handleError<any>(`getObject query=${queryParams}`))
      );
  }


  // POST: ad a new object to the db
  addObject (object: ObjectClass): Observable<ObjectClass> {
    return this.httpClient.post<ObjectClass>(this.url, object, httpOptions)
      .pipe(
        catchError(this.handleError<ObjectClass>('addObject'))
      );
  }

  // PUT: update the object on the server, based on id
  putObject (object: ObjectClass, id: string): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, object, httpOptions).pipe(
      catchError(this.handleError<any>('updateObject'))
    );
  }

  // PATCH: update certain fields of the object, using query params or id
  patchObject (objectData: any, queryObject: any | string): Observable<any> {
    // Use id if a string is provided
    const id = typeof queryObject === 'string' ? queryObject : null;
    let url = this.url;
    const options = httpOptions;
    if (id) {
      url = `${this.url}/${id}`;
    } else {
      // Use params if object is provided instead of id
      options['params'] = queryObject;
    }
    return this.httpClient.patch(url, objectData, options).pipe(
      catchError(this.handleError<any>('updateObject'))
    );
  }

  // DELETE: delete the object from the server using id or object with id field
  deleteObject (object: ObjectClass | string): Observable<any> {
    const id = typeof object === 'string' ? object : object['_id'];
    const url = `${this.url}/${id}`;

    return this.httpClient.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteObject'))
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

      console.error(error); // log to console

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ObjectService message with the MessageService */
  private log(message: string) {
    console.log('ObjectService: ' + message);
  }

}
