import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HorarioAsigPage } from './horario-asig.page';

describe('HorarioAsigPage', () => {
  let component: HorarioAsigPage;
  let fixture: ComponentFixture<HorarioAsigPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioAsigPage ],
      imports: [IonicModule.forRoot()],
      providers: [ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(HorarioAsigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
