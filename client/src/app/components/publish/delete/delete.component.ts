import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  messageClass;
  message;
  found = false;
  processing = false;
  post;
  currentUrl;

  constructor(
  	private postsService: PostsService,
  	private activatedRoute: ActivatedRoute,
  	private router: Router
  	) { }

  ngOnInit() {
  	this.currentUrl = this.activatedRoute.snapshot.params;
    this.postsService.getPost(this.currentUrl.id).subscribe((post) => {
      if (!post.success) {
        this.messageClass = 'alert alert-danger';
        this.message = post.message
      } else {
        this.found = true;
        this.post = post.post[0];  
        console.log(this.post)
      }     
    })
  }

  deletePost() {
  	this.processing = true;
  	this.postsService.deletePost(this.currentUrl.id).subscribe((data) => {
  		if (!data.success) {
  			this.messageClass = 'alert alert-danger';
  			this.message = data.message
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
