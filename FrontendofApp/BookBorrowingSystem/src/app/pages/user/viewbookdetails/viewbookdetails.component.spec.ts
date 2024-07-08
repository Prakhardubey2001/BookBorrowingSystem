import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookdetailsComponent } from './viewbookdetails.component';

describe('ViewbookdetailsComponent', () => {
  let component: ViewbookdetailsComponent;
  let fixture: ComponentFixture<ViewbookdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbookdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewbookdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
