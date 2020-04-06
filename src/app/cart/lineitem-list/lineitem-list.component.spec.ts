import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineitemListComponent } from './lineitem-list.component';

describe('LineitemListComponent', () => {
  let component: LineitemListComponent;
  let fixture: ComponentFixture<LineitemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineitemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineitemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
