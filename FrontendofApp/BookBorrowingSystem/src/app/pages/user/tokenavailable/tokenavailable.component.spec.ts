import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenavailableComponent } from './tokenavailable.component';

describe('TokenavailableComponent', () => {
  let component: TokenavailableComponent;
  let fixture: ComponentFixture<TokenavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
