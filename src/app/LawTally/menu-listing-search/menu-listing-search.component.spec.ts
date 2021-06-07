import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListingSearchComponent } from './menu-listing-search.component';

describe('MenuListingSearchComponent', () => {
  let component: MenuListingSearchComponent;
  let fixture: ComponentFixture<MenuListingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuListingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
