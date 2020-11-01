import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrescosComponent } from './frescos.component';

describe('FrescosComponent', () => {
  let component: FrescosComponent;
  let fixture: ComponentFixture<FrescosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrescosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrescosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
