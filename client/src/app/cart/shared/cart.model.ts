export interface Cart {
  _id: string;
  uid: string;
  recipeIds: string[];
  isActive: boolean;
  date: Date;

}
