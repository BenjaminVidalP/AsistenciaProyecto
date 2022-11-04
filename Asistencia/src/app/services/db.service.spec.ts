import { TestBed } from '@angular/core/testing';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SQLite, NativeStorage]
    });
    service = TestBed.inject(DbService);
  });
  afterEach(()=> {
    localStorage.removeItem('todos');
    service = null;
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returning empty nativestorage', () => {
    expect(service.obtenerNativeStorage()).toEqual([]);
  });

  it('returning on nativestorage', () => {
    const arr = ['Minecraft'];
    localStorage.setItem('todos',JSON.stringify(arr));

    expect(service.obtenerNativeStorage()).toEqual([]);
  });

  
});
