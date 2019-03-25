export interface Recipe {
  _id: string;
  name: string;
  uid: string;
  description: string;
  time: string;
  imgUrl: string;
  instructions: string;
  ingredients: string[];
  cuisines: any[] ;
  cuisineObj: any;
}
