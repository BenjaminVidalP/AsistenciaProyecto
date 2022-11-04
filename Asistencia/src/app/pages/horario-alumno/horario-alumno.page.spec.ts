import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { IonicModule } from '@ionic/angular';

import { HorarioAlumnoPage } from './horario-alumno.page';

describe('HorarioAlumnoPage', () => {
  let component: HorarioAlumnoPage;
  let fixture: ComponentFixture<HorarioAlumnoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioAlumnoPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute, Camera]
    }).compileComponents();

    fixture = TestBed.createComponent(HorarioAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
