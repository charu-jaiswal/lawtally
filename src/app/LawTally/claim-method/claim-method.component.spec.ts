import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimMethodComponent } from './claim-method.component';

describe('ClaimMethodComponent', () => {
  let component: ClaimMethodComponent;
  let fixture: ComponentFixture<ClaimMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
