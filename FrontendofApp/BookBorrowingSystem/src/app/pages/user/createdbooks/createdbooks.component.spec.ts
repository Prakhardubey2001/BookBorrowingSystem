import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedbooksComponent } from './createdbooks.component';

describe('CreatedbooksComponent', () => {
  let component: CreatedbooksComponent;
  let fixture: ComponentFixture<CreatedbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedbooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
