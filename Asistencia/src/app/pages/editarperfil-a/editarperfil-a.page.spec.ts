import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonicModule } from '@ionic/angular';

import { EditarperfilAPage } from './editarperfil-a.page';

describe('EditarperfilAPage', () => {
  let component: EditarperfilAPage;
  let fixture: ComponentFixture<EditarperfilAPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarperfilAPage ],
      imports: [IonicModule.forRoot()],
      providers: [EmailComposer]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarperfilAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
