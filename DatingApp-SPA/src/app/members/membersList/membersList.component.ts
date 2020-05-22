import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_Services/user.service';
import { AlertifyService } from '../../_Services/alertify.service';
import { User } from '../../_Models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-membersList',
  templateUrl: './membersList.component.html',
  styleUrls: ['./membersList.component.css']
})
export class MembersListComponent implements OnInit {
  users: User[];

  constructor(private route: ActivatedRoute,private userService: UserService, private alertify: AlertifyService ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

}
