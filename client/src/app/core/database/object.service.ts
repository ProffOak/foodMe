import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FirestoreService} from './firestore.service';
import {QueryFn} from 'angularfire2/firestore';




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

  protected constructor(private httpClient: HttpClient, private objectName: string,
                        private firebaseService: FirestoreService<ObjectClass>) {
    // Add the object name to the base url to form the url to the object
    this.url = this.apiBase + objectName;
  }

  // GET Objects from the server
  getObjects (): Observable<ObjectClass[]> {
    /*return this.httpClient.get<ObjectClass[]>(this.url)
      .pipe(
        catchError(this.handleError('getObjects', []))
      );*/
    return this.firebaseService.getItems(this.objectName);
  }

  // GET object by id.
  getObjectById(id: string): Observable<ObjectClass> {
    /*const url = `${this.url}/${id}`;
    return this.httpClient.get<ObjectClass>(url)
      .pipe(
        catchError(this.handleError<any>(`getObject id=${id}`))
      );*/
    return this.firebaseService.getItem(this.objectName, id);
  }

  // GET objects by firebase query function
  getObjectsByQuery(queryFn: QueryFn): Observable<ObjectClass[]> {
    return this.firebaseService.getItems(this.objectName, queryFn);
  }

  // Dynamically creates a query function from an regular javascript object
  getObjectsByQueryObject(obj: any): Observable<ObjectClass[]> {
    return this.firebaseService.getItems(this.objectName, ref => {
      let query = null;
      let i = 0;
      Object.entries(obj).forEach(([key, val]) => {
        if (i === 0) {
          query = ref.where(key, '==', val);
        } else {
          query = query.where(key, '==', val);
        }
        i++;
      });
      return query;
    });
  }

  getAll(ids: string[]): Observable<ObjectClass[]> {
    return this.firebaseService.getAll(this.objectName, ids);
  }


  // POST: ad a new object to the db
  addObject (object: ObjectClass): Promise<ObjectClass> {
    return this.firebaseService.insertItem(this.objectName, object);
  }

  // PATCH: update certain fields of the object, using query params or id
  patchObject (objectData: any, id: string): Promise<any> {
    return this.firebaseService.upsertItem(this.objectName, id, objectData);
  }

  // DELETE: delete the object from the server using id or object with id field
  deleteObject (object: ObjectClass | string): Promise<any> {
    const id = typeof object === 'string' ? object : object['_id'];
    return this.firebaseService.deleteItem(this.objectName, id);
  }

  objectExists(id: string): Promise<boolean> {
    return this.firebaseService.itemExistId(this.objectName, id);
  }

  objectExistsQuery(queryFn: QueryFn): Promise<boolean> {
    return this.firebaseService.itemsExistQuery(this.objectName, queryFn);
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
