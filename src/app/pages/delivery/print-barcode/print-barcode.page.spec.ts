import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrintBarcodePage } from './print-barcode.page';

describe('PrintBarcodePage', () => {
  let component: PrintBarcodePage;
  let fixture: ComponentFixture<PrintBarcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintBarcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrintBarcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
