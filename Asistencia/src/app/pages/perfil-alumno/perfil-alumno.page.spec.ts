import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { PerfilAlumnoPage } from './perfil-alumno.page';

describe('PerfilAlumnoPage', () => {
  let component: PerfilAlumnoPage;
  let fixture: ComponentFixture<PerfilAlumnoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAlumnoPage ],
      imports: [IonicModule.forRoot()],
      providers: [Camera, NativeStorage, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


});
