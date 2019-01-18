import { Component } from '@angular/core';
import {User} from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User = {
    name: 'Bhuvan',
    phone: '',
    account: {
      email: '',
      confirm: ''
    }
  };
  title = 'angulartemplatedrivenform';
  signup(data){
    alert(data.name);
    alert(data.phone);
    alert(JSON.stringify(data));
  }
}

