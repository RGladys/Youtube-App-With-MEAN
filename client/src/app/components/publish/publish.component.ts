import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  form;
  processing = false;
  username;
  messageClass;
  message;
  videos = '';
  q = '';
  link;
  linkTitle;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router
    ) {
    this.form = this.formBuilder.group({
      link: '',
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(600)
      ])]
    })
  }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile) => {
      this.username = profile.user.username;
    })
  }

  getVideos() {
    this.postsService.searchVideo(this.q).subscribe((data) => {
      this.videos = data.items;
    })
  }

  choseVideo(video) {
    this.link = 'http://www.youtube.com/embed/' + video.id;
    this.linkTitle = video.title;
    this.form.setValue({link: '', body: this.form.get('body').value})
  }

  newPost() {
    this.processing = true;
  	const post = {
      link: this.link,
      body: this.form.get('body').value.trim(),
      author: this.username
    };
    this.postsService.newPost(post).subscribe((data) => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/post', data.id])
        }, 1000)
      }
    })
  } 
}
