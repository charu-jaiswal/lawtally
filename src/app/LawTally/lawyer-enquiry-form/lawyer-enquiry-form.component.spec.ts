import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerEnquiryFormComponent } from './lawyer-enquiry-form.component';

describe('LawyerEnquiryFormComponent', () => {
  let component: LawyerEnquiryFormComponent;
  let fixture: ComponentFixture<LawyerEnquiryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerEnquiryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerEnquiryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
