import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeFromComponent } from './create-recipe-from.component';

describe('CreateRecipeFromComponent', () => {
  let component: CreateRecipeFromComponent;
  let fixture: ComponentFixture<CreateRecipeFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecipeFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecipeFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
