import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegist = new EventEmitter;

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() =>{
      console.log('success');
    this.cancelRegist.emit(false);
  },
     (error) => {
      console.log(error);
    }
    );
  }

  cancel() {
    this.cancelRegist.emit(false);
    console.log('cancelled');
  }

}
