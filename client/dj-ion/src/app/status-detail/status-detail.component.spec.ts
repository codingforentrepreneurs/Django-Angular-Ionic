import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDetailComponent } from './status-detail.component';

describe('StatusDetailComponent', () => {
  let component: StatusDetailComponent;
  let fixture: ComponentFixture<StatusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
