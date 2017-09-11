import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUrl;
  posts;
  postsNumber;
  username;

  constructor(
  	private activatedRoute: ActivatedRoute,
  	private postsService: PostsService,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  	) { }

  ngOnInit() {
  	this.currentUrl = this.activatedRoute.snapshot.params;
  	this.username = this.currentUrl.user;
    this.authService.getProfile().subscribe((profile) => {
      if (profile.user.username === this.username) {
        this.router.navigate(['/myprofile'])
      }
    })
  	this.postsService.getAllPostsBy(this.username).subscribe((posts) => {
      if (!posts.success) {
        
      } else {
        this.posts = posts.message;
        this.postsNumber = posts.message.length
      }     
    })
  }

  enableLink(link) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(link)
  }
}
