import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private titleService: Title, private metaTagService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('homepage');
    this.metaTagService.addTag({
      name: 'keywords',
      content: 'recttes recipe halal islam food ',
    });
    this.metaTagService.updateTag({
      name: 'description',
      content: 'recettes halal - food Halal',
    });
  }
}
