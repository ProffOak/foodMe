import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from 'angularfire2/firestore';
import {combineAll, combineLatest, map, take, toArray} from 'rxjs/operators';
import {Observable, merge} from 'rxjs/index';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService<ItemClass> {

  constructor(private afs: AngularFirestore) {  }

  ////////////////////
  // Help Functions //
  ////////////////////
/*
  getTimestamp(): any {
    // return firebase.database.ServerValue.TIMESTAMP;
  }*/

  ////////////////////
  // Item Functions //
  ////////////////////

  getItem (path: string, id: string): Observable<ItemClass> {
    return this.doc$(path, id).valueChanges();
  }

  insertItem (path: string, data: any): Promise<any> {
    return this.col$(path).add(data);
  }

  updateItem (path: string, id: string, data: any): Promise<void> {
    return this.doc$(path, id).update(data);
  }

  upsertItem(path: string, id: string, data: any): Promise<void> {
    return this.doc$(path, id).set(data, {merge: true});
  }

  setItem (path: string, id: string, data: any): Promise<void> {
    return this.doc$(path, id).set(data);
  }

  deleteItem (path: string, id: string): Promise<void> {
    return this.doc$(path, id).delete();
  }

  getItems (path: string, queryFn?: QueryFn): Observable<ItemClass[]> {
    return this.colWithIds$(path, queryFn);
  }

  itemsExistQuery(path: string, queryFn?: QueryFn): Promise<boolean> {
    return this.col$(path, queryFn).snapshotChanges()
      .pipe(
        take(1),
        map(items => items.length > 0 )
      ).toPromise();
  }

  getAll(path: string, ids: string[]): Observable<ItemClass[]> {
    const docArr = <Observable<ItemClass>[]>[];
    for( const id of ids) {
      docArr.push(this.doc$(path, id).valueChanges());
    }
    return merge(...docArr).pipe(
      take(docArr.length),
      toArray());
  }

  itemExistId(path, id): Promise<boolean> {
    return this.doc$(path, id).snapshotChanges().pipe(
      take(1),
      map(item => item.payload.exists)
    ).toPromise();
  }

  //////////////////////////////////////
  // Firebase Communication Functions //
  //////////////////////////////////////

  doc$(path: string, id: string): AngularFirestoreDocument<ItemClass> {
    return this.afs.doc(`${path}/${id}`);
  }

  col$(path: string, queryFn?: QueryFn): AngularFirestoreCollection<ItemClass> {
    return this.afs.collection(path, queryFn);
  }

  colWithIds$(path: string, queryFn?: QueryFn): Observable<ItemClass[]> {
    return this.col$(path, queryFn).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as ItemClass;
          data['_id'] = a.payload.doc.id;
          return data;
        });
      })
    );
  }
}
