import {Quisine} from '../../quisine/shared/quisine.model';

export interface Recipe {
  _id: String;
  name: String;
  uid: String;
  description: String;
  time: String;
  imgUrl: String;
  instructions: String;
  ingredients: [String];
  quisines: [String] ;
}
