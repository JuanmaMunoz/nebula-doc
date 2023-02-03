import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'nebula-doc',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nebula-doc';
  private subscription = new Subscription();
  private docUrl = 'http://192.168.0.13:8080/';
  private pathUrl = 'getting-started.html';
  private  languageSelected: string = localStorage.getItem('nebulaLanguage') || 'en';
  public iframeUrl: SafeResourceUrl | null = null;;
  constructor(private translate: TranslateService, private domSanitizer: DomSanitizer ) {
  }

  ngOnInit(): void {
    //this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.docUrl}${this.languageSelected}/${this.pathUrl}`);
    this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('http://192.168.0.13:8080/es/HTML/getting-started.html')
    //http://192.168.0.13:8080/es/HTML/nebulaapi-user-management.html
    this.subscription.add(
      fromEvent(window,'externalChangeLanguage').subscribe((data:Partial<CustomEvent>)=>{
        this.translate.use(data.detail.language);
      })
    );
    this.translate.use(this.languageSelected);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
