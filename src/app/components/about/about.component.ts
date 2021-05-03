import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private titleService: Title, private metaTagService: Meta) {}

  ngOnInit(): void {
    // this.titleService.setTitle('a propos de nous');
    this.metaTagService.updateTag({
      name: 'keywords',
      content: 'recttes crok-halal islam religion',
    });
  }
}
