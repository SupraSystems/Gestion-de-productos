import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDescuentosComponent } from './registro-descuentos.component';

describe('RegistroDescuentosComponent', () => {
  let component: RegistroDescuentosComponent;
  let fixture: ComponentFixture<RegistroDescuentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDescuentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
