import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineAdminComponent } from './cuisine-admin.component';

describe('CuisineAdminComponent', () => {
  let component: CuisineAdminComponent;
  let fixture: ComponentFixture<CuisineAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
