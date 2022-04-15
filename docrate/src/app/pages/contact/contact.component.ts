import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fade]

})
export class ContactComponent implements OnInit {

  public constructor(private titleService: Title) { }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("DocRate | Контакти")
  }

}
