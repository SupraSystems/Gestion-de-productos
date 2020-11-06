import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassicosDelHogarComponent } from './bassicos-del-hogar.component';

describe('BassicosDelHogarComponent', () => {
  let component: BassicosDelHogarComponent;
  let fixture: ComponentFixture<BassicosDelHogarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassicosDelHogarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassicosDelHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
