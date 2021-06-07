import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsOnBusinessDetailsComponent } from './questions-on-business-details.component';

describe('QuestionsOnBusinessDetailsComponent', () => {
  let component: QuestionsOnBusinessDetailsComponent;
  let fixture: ComponentFixture<QuestionsOnBusinessDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsOnBusinessDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsOnBusinessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
