import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsOnBusinessComponent } from './questions-on-business.component';

describe('QuestionsOnBusinessComponent', () => {
  let component: QuestionsOnBusinessComponent;
  let fixture: ComponentFixture<QuestionsOnBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsOnBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsOnBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
