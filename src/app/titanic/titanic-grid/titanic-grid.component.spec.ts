import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitanicGridComponent } from './titanic-grid.component';

describe('TitanicGridComponent', () => {
  let component: TitanicGridComponent;
  let fixture: ComponentFixture<TitanicGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitanicGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitanicGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
