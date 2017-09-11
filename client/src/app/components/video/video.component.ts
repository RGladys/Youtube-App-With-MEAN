import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() video;
  link;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.link = this.enableLink(this.video)
  }

  enableLink(link) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(link)
  }

}
