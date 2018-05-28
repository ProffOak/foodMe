import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdminComponent } from './recipe-admin.component';

describe('RecipeAdminComponent', () => {
  let component: RecipeAdminComponent;
  let fixture: ComponentFixture<RecipeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
