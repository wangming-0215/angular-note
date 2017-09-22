import { Component, Input, OnInit } from '@angular/core';
import { Hero } from './hero.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Displaying Data';
  // heroes = ['wangming', 'xiaoming', 'daming'];
  heroes = [
    new Hero(1, 'wangming'),
    new Hero(23, 'xiaoming'),
    new Hero(45, 'daming'),
    new Hero(22, 'mingming')
  ];
  myHero = this.heroes[0];

  ngOnInit() {}
}
