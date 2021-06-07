import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddreviewComponent } from './user-addreview.component';

describe('UserAddreviewComponent', () => {
  let component: UserAddreviewComponent;
  let fixture: ComponentFixture<UserAddreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
