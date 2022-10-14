import { TestBed } from '@angular/core/testing';

import { TomarFotoService } from './tomar-foto.service';

describe('TomarFotoService', () => {
  let service: TomarFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TomarFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
