import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuisineFormComponent } from './create-cuisine-form.component';

describe('CreateCuisineFormComponent', () => {
  let component: CreateCuisineFormComponent;
  let fixture: ComponentFixture<CreateCuisineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCuisineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCuisineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
