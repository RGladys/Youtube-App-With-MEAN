import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  form: FormGroup;
  processing = false;
  username;
  messageClass;
  message;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postsService: PostsService
    ) {
    this.form = this.formBuilder.group({
      link: ['', Validators.compose([
        Validators.required,
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(400)
      ])]
    })
  }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile) => {
      this.username = profile.user.username;
    })
  }

  getPosts() {
  	
  }

  newPost() {
    this.processing = true;
  	const post = {
      link: this.form.get('link').value,
      body: this.form.get('body').value,
      author: this.username
    };
    this.postsService.newPost(post).subscribe((data) => {
      if (!data.succes) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = false;
          this.message = false;
          this.form.reset();
        }, 2000)
      }
    })
  } 
}
