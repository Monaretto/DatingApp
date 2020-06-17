import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserForUpdateDTO } from "../_Models/user";
import { PaginatedResult } from "../_Models/pagination";
import { map } from "rxjs/operators";
import { Message } from "../_Models/message";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private Http: HttpClient) {}

  getUsers(
    page?,
    itemsPerPage?,
    userParams?,
    likesParam?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append("pagenumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (userParams) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    if (likesParam === "Likers") {
      params = params.append("likers", "true");
    }

    if (likesParam === "Likees") {
      params = params.append("likees", "true");
    }

    return this.Http.get<User[]>(this.baseUrl + "users", {
      observe: "response",
      params,
    }).pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get("pagination")) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get("pagination")
          );
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

  deletePhoto(userId: number, id: number) {
    return this.Http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.Http.post(
      this.baseUrl + "users/" + id + "/like/" + recipientId,
      {}
    );
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();

    let params = new HttpParams();

    params = params.append("MessageContainer", messageContainer);

    if (page && itemsPerPage) {
      params = params.append("pagenumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    return this.Http.get<Message[]>(
      this.baseUrl + "users/" + id + "/messages",
      { observe: "response", params }
    ).pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get("Pagination")) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get("Pagination")
          );
        }

        return paginatedResult;
      })
    );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.Http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.Http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.Http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.Http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
