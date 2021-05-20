import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Recyfrica | Sustainable Waste Management Service.';
  constructor(private metaService: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {
        name: 'keywords',
        content:
          'Collection point Locator,dedicated,recycling,rewarding,experience,climate,action,rewarded,community,.from app.component',
      },
      {
        name: 'description',
        content:
          'Recyfrica is a social and micro rewards platform to create an awesome experience for you to help curb the growing waste menace across urban African cities.',
      },
      { name: 'robots', content: 'index, follow' },
    ]);
  }
}
