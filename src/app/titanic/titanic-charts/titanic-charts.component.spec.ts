import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitanicChartsComponent } from './titanic-charts.component';

describe('TitanicChartsComponent', () => {
  let component: TitanicChartsComponent;
  let fixture: ComponentFixture<TitanicChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitanicChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitanicChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
