import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [fade]

})
export class AboutComponent implements OnInit {

  public constructor(private titleService: Title) { }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("DocRate | За Нас")
  }

}
