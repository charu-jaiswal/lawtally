import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectReviewsComponent } from './collect-reviews.component';

describe('CollectReviewsComponent', () => {
  let component: CollectReviewsComponent;
  let fixture: ComponentFixture<CollectReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
