import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../_Services/auth.service";
import { AlertifyService } from "../_Services/alertify.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }

    this.alertify.error("not logged in");
    return false;
  }
}
