import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class PostsService {

  header;
  domain = this.authService.domain;

  constructor(
  	private authService: AuthService,
  	private http: Http
  	) { }

  createAuthenticationHeaders() {
    this.authService.authToken = localStorage.getItem('token');
    this.header = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorisation': this.authService.authToken
      })
    })
  }

  newPost(post) {
  	this.createAuthenticationHeaders();
  	return this.http.post(this.domain + 'posts/newpost', post, this.header).map((res) => res.json())
  }

  getAllPosts() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'posts/getposts', this.header).map((res) => res.json())
  }

  getPost(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'posts/getpost/' + id, this.header).map((res) => res.json())
  }

  updatePost(post) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'posts/updatepost/', post, this.header).map((res) => res.json())
  }

  deletePost(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'posts/deletepost/' + id, this.header).map((res) => res.json())
  }
}
