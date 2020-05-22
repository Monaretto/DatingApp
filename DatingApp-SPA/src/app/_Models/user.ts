import { PathLocationStrategy } from "@angular/common";
import { Photo } from "./photo";

export interface User {
  id: number;
  username: string;
  knowAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookinFor?: string;
  photos?: Photo[];
}

export interface UserForUpdateDTO {
  Introduction: string;
  LookingFor: string;
  Interest: string;
  City: string;
  Country: string;
}
