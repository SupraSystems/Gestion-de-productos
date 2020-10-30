import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCombosComponent } from './registro-combos.component';

describe('RegistroCombosComponent', () => {
  let component: RegistroCombosComponent;
  let fixture: ComponentFixture<RegistroCombosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCombosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCombosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
