import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.page.html',
  styleUrls: ['./blocked.page.scss'],
})
export class BlockedPage implements OnInit {
  language:any;
  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }
  changeLanguage(lan){
    console.log(lan);
    this.translate.setDefaultLang(lan);
  }
}
