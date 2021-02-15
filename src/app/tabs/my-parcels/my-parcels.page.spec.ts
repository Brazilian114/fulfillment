import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyParcelsPage } from './my-parcels.page';

describe('MyParcelsPage', () => {
  let component: MyParcelsPage;
  let fixture: ComponentFixture<MyParcelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyParcelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyParcelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
