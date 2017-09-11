import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  currentUrl;
  messageClass;
  message;
  post;
  found = false;
  form;
  processing = false;
  comments;
  username;
  commentsBool = false;
  link;

  constructor(
  	private postsService: PostsService,
  	private authService: AuthService,
  	private activatedRoute: ActivatedRoute,
  	private router: Router,
  	private formBuilder: FormBuilder,
    private location: Location,
    private domSanitizer: DomSanitizer
  	) {
  	this.form = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(700)
      ])]
    })
    }

  ngOnInit() {
  	this.currentUrl = this.activatedRoute.snapshot.params;
    this.postsService.readPost(this.currentUrl.id).subscribe((post) => {
      if (!post.success) {
        this.messageClass = 'alert alert-danger';
        this.message = post.message;
      } else {
      	this.found = true;
        this.post = post.post[0];
        this.comments = post.post[0].comments.reverse();
        this.link = this.domSanitizer.bypassSecurityTrustResourceUrl(post.post[0].link)
        if (this.comments[0]) {
          this.commentsBool = true
        }
      }     
    });
    this.authService.getProfile().subscribe((profile) => {
      this.username = profile.user.username;
    })
  }

  back() {
   this.location.back()
  }

  newComment() {
  	this.currentUrl = this.activatedRoute.snapshot.params;
  	const comment = {
  		id: this.currentUrl.id,
  		comment: this.form.get('comment').value.trim()
  	};
  	this.postsService.newComment(comment).subscribe((data) => {
  		this.processing = true;
  		if (!data.success) {
  			this.messageClass = 'alert alert-danger';
  			this.message = data.message;
  			this.processing = false;
  		} else {
  			this.messageClass = false;
  			this.message = false;
  			this.comments.unshift({
  				commentAuthor: this.username,
  				comment: comment.comment,
          date: new Date()
  			});
        this.commentsBool = true;
        setTimeout(() => {
          this.processing = false;
        }, 2000)
  		}
  	})

}

 

}