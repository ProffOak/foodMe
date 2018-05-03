import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuisineComponent } from './quisine.component';

describe('QuisineComponent', () => {
  let component: QuisineComponent;
  let fixture: ComponentFixture<QuisineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuisineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
