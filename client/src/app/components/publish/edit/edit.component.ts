import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  messageClass = false;
  message = false;
  postBody = "asdsda";
  processing = false;

  constructor() { }

  ngOnInit() {
  }

  updatePost() {
  	console.log('test')
  }
}
