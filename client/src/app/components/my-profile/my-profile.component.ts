import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  username;
  email;
  posts;
  postsNumber;

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private domSanitizer: DomSanitizer
    ) { }

  ngOnInit() {
  	this.authService.getProfile().subscribe((data) => {
  		this.username = data.user.username;
  		this.email = data.user.email;
      this.postsService.getAllPostsBy(this.username).subscribe((data) => {
        if (!data.success) {
          console.log('No posts by this user')
        } else {
          this.posts = data.message;
          this.postsNumber = data.message.length;
        }
      });
  	}); 
  }

  enableLink(link) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(link)
  }

}
