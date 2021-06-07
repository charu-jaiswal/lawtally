import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskFreeQuestionComponent } from './ask-free-question.component';

describe('AskFreeQuestionComponent', () => {
  let component: AskFreeQuestionComponent;
  let fixture: ComponentFixture<AskFreeQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskFreeQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskFreeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
