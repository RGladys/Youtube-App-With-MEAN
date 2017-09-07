import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

  domain: String = 'http://localhost:3000/';
  authToken;
  user;
  header;

  constructor(private http: Http) { }

  //Register methods
  register(user) {
  	return this.http.post(this.domain + 'auth/register', user).map((res) => res.json())
  }

  checkUsername(username) {
  	return this.http.get(this.domain + 'auth/checkUsername/' + username).map((res) => res.json())
  }

  checkEmail(email) {
  	return this.http.get(this.domain + 'auth/checkEmail/' + email).map((res) => res.json())
  }

  //Login methods
  login(user) {
  	return this.http.post(this.domain + 'auth/login', user).map((res) => res.json())
  }

  storeUserData(token, user) {
  	localStorage.setItem('token', token);
  	localStorage.setItem('user', user);
  	this.authToken = token;
  	this.user = user
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear()
  }

  //Authentication

  createAuthenticationHeaders() {
    this.authToken = localStorage.getItem('token');
    this.header = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorisation': this.authToken
      })
    })
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'auth/profile', this.header).map((res) => res.json())
  }

  loggedIn() {
  return tokenNotExpired();
  }
}
