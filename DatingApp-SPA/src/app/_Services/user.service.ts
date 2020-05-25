import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserForUpdateDTO } from "../_Models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private Http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.Http.get<User[]>(this.baseUrl + "users");
  }

  getUser(id): Observable<User> {
    return this.Http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(id: number, user: User) {
    const url = this.baseUrl + "users/" + id;
    return this.Http.put(url, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.Http.post(
      this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain",
      {}
    );
  }

  deletePhoto(userId: number, id: number)
  {
    return this.Http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }
}
