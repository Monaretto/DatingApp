import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserForUpdateDTO } from "../_Models/user";
import { PaginatedResult } from '../_Models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private Http: HttpClient) {}

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pagenumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.Http.get<User[]>(this.baseUrl + "users", {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination'))
        {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      })
    );
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
