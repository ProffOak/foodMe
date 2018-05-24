import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCartCardComponent } from './ingredient-cart-card.component';

describe('IngredientCartCardComponent', () => {
  let component: IngredientCartCardComponent;
  let fixture: ComponentFixture<IngredientCartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientCartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientCartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
