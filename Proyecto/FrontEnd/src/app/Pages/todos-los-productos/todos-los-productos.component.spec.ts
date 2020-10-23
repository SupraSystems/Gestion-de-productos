import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLosProductosComponent } from './todos-los-productos.component';

describe('TodosLosProductosComponent', () => {
  let component: TodosLosProductosComponent;
  let fixture: ComponentFixture<TodosLosProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosLosProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosLosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
