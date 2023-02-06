import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocPathService {
  constructor() {}

  getPath(url: string | null): string {
    let path = '';
    switch (url) {
      case 'docStart':
        path = 'getting-started.html';
        break;
      case 'docUserGuide':
        path = 'nebulausers-user-guide-es.html';
        break;
      default:
        path = 'getting-started.html';
        break;
    }
    return path;
  }
}
