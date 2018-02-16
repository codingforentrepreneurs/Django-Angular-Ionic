import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActionComponent } from './status-action.component';

describe('StatusActionComponent', () => {
  let component: StatusActionComponent;
  let fixture: ComponentFixture<StatusActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
