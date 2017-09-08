import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  messageClass;
  message;
  post;
  processing = false;
  currentUrl;
  display = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.postsService.getPost(this.currentUrl.id).subscribe((post) => {
      if (!post.success) {
        this.messageClass = 'alert alert-danger';
        this.message = post.message
      } else {
        this.display = true;
        this.post = post.post[0];  
        console.log(this.post)
      }     
    })
  }

  updatePost() {
    this.processing = true;
  	this.postsService.updatePost(this.post).subscribe((data) => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/dashboard'])
        }, 1000)
      }
    })
  }
}
