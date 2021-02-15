import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckPricePage } from './check-price.page';

describe('CheckPricePage', () => {
  let component: CheckPricePage;
  let fixture: ComponentFixture<CheckPricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPricePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckPricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
