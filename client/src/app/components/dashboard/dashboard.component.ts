import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  postsArray;
  username;

  constructor(
  	private authService: AuthService,
    private postsService: PostsService,
    private domSanitizer: DomSanitizer
  	) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile) => {
      this.username = profile.user.username;
    });
  	this.getAllPosts()
  }

  getAllPosts() {
  	this.postsService.getAllPosts().subscribe((posts) => {
  		this.postsArray = posts.posts
  	})
  }

  enableLink(link) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(link)
  }

}
