import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaFarmaciaComponent } from './para-farmacia.component';

describe('ParaFarmaciaComponent', () => {
  let component: ParaFarmaciaComponent;
  let fixture: ComponentFixture<ParaFarmaciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParaFarmaciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
