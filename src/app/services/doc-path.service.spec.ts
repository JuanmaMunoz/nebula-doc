import { TestBed } from '@angular/core/testing';

import { DocPathService } from './doc-path.service';

describe('DocPathService', () => {
  let service: DocPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
