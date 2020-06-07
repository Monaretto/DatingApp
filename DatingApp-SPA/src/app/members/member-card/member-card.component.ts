import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_Models/user';
import { AuthService } from '../../_Services/auth.service';
import { UserService } from '../../_Services/user.service';
import { AlertifyService } from '../../_Services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService) {}

  ngOnInit() {}

  sendLike(id: number)
  {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.username);
    }, error => {
      this.alertify.error(error);
    });
    )
  }
}
