import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCartCardComponent } from './recipe-cart-card.component';

describe('RecipeCartCardComponent', () => {
  let component: RecipeCartCardComponent;
  let fixture: ComponentFixture<RecipeCartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
