import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: firebase.User;
  constructor(private authservice: AuthService) {
    this.authservice.user.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  login() {
    this.authservice.login();
  }


}
