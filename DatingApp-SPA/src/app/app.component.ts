import { Component, OnInit } from '@angular/core';
import { AuthService } from './_Services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DatingApp-SPA';
  jwtHelper = new JwtHelperService();

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.auth.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.auth.currentUser = user;
      this.auth.changeMemberPhoto(user.photoUrl);
    }

  }
}
