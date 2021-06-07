import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListingSearchComponent } from './home-listing-search.component';

describe('HomeListingSearchComponent', () => {
  let component: HomeListingSearchComponent;
  let fixture: ComponentFixture<HomeListingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
