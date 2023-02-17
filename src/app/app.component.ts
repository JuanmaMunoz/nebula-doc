import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, Subscription } from 'rxjs';
import { DocPathService } from './services/doc-path.service';

@Component({
  selector: 'nebula-doc',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private ip = '//localhost:8080/';
  private languageSelected: string = localStorage.getItem('nebulaLanguage') || 'en';
  public iframeUrl: SafeResourceUrl | null = null;

  constructor(private translate: TranslateService, private domSanitizer: DomSanitizer, private docPathService: DocPathService) {}

  ngOnInit(): void {
    this.loadIframe();
    this.translate.use(this.languageSelected);
    this.subscription.add(
      fromEvent(window, 'externalChangeLanguage').subscribe((data: Partial<CustomEvent>) => {
        this.languageSelected = data.detail.language;
        this.translate.use(this.languageSelected);
        this.loadIframe();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadIframe(): void {
    const url = sessionStorage.getItem('nebulaDocUrl');
    this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      `${this.ip}${this.languageSelected}/HTML/${this.docPathService.getPath(url)}`
    );
  }
}
