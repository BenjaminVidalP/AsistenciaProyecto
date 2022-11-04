import { TestBed } from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

import { TomarFotoService } from './tomar-foto.service';

describe('TomarFotoService', () => {
  let service: TomarFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[Camera]
    });
    service = TestBed.inject(TomarFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
