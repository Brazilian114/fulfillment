import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverPage } from './driver.page';

describe('DriverPage', () => {
  let component: DriverPage;
  let fixture: ComponentFixture<DriverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
