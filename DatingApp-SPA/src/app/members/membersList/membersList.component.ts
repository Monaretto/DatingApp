import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_Services/user.service";
import { AlertifyService } from "../../_Services/alertify.service";
import { User } from "../../_Models/user";
import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginatedResult } from "../../_Models/pagination";

@Component({
  selector: "app-membersList",
  templateUrl: "./membersList.component.html",
  styleUrls: ["./membersList.component.css"],
})
export class MembersListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{Value: 'male', display: 'Males'},{Value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });

    this.userParams.gender = this.user.gender === "female"? 'male': 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  pageChangedEvent(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === "female"? 'male': 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage,
         this.pagination.itemsPerPage,
         this.userParams)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
