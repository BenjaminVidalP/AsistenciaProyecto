import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { ListaAlumnosPage } from './lista-alumnos.page';

describe('ListaAlumnosPage', () => {
  let component: ListaAlumnosPage;
  let fixture: ComponentFixture<ListaAlumnosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlumnosPage ],
      imports: [IonicModule.forRoot()],
      providers: [SQLite, NativeStorage]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
