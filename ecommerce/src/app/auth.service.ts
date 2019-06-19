import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetails } from './models/user-details';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  user: Observable<firebase.User>;
  userDetails: UserDetails;
  email: string;
  constructor(private afauth: AngularFireAuth, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.user = this.afauth.authState;
  }

  login() {
    let url = this.route.snapshot.queryParamMap.get('returnUrl');
    if (!url) url = '/';
    localStorage.setItem("returnUrl", url);
    this.afauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afauth.auth.signOut();
  }

  verifyUser(email: string) {

    /*this.httpClient.post<UserDetails>('http://localhost:8080/user/save', JSON.stringify({ email: email }),
      { headers: this.headers }).subscribe(res => {
        this.userDetails = res;
        console.log('user after saving ' + this.userDetails.id);
      });*/

    return this.httpClient.post<UserDetails>('http://localhost:8080/user/save', JSON.stringify({ email: email }),
      { headers: this.headers }).toPromise().then(res => {
      this.userDetails = res; //console.log('id ' + this.userDetails.id); 
      })


  }

}
