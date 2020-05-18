import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegist = new EventEmitter;

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() =>{
      this.alertify.success('registration successfull');
    this.cancelRegist.emit(false);
  },
     (error) => {
      this.alertify.error(error);
    }
    );
  }

  cancel() {
    this.cancelRegist.emit(false);
    console.log('cancelled');
  }

}
