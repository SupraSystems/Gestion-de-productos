import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HigieneBellezaComponent } from './higiene-belleza.component';

describe('HigieneBellezaComponent', () => {
  let component: HigieneBellezaComponent;
  let fixture: ComponentFixture<HigieneBellezaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HigieneBellezaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HigieneBellezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
