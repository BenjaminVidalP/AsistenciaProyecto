import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonicModule } from '@ionic/angular';

import { EditarperfilPPage } from './editarperfil-p.page';

describe('EditarperfilPPage', () => {
  let component: EditarperfilPPage;
  let fixture: ComponentFixture<EditarperfilPPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarperfilPPage ],
      imports: [IonicModule.forRoot()],
      providers: [EmailComposer]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarperfilPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
