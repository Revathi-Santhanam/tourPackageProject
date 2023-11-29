import { Itineraray } from "./itineraray";

export interface Tour {
  id:number;
  categoryId?:number
  tourName:string;
  tourPhoto?:any;
  price:number;
  destination:string;
  totalSeats:number;
  balanceSeats?:number;
  days:number;
  departureDate?:Date;
  tourDescription:string;
  itineraries:Itineraray[];
}
