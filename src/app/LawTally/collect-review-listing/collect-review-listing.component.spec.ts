import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectReviewListingComponent } from './collect-review-listing.component';

describe('CollectReviewListingComponent', () => {
  let component: CollectReviewListingComponent;
  let fixture: ComponentFixture<CollectReviewListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectReviewListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectReviewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
