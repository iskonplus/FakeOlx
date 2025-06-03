import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToMainComponent } from './return-to-main.component';

describe('ReturnToMainComponent', () => {
  let component: ReturnToMainComponent;
  let fixture: ComponentFixture<ReturnToMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnToMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnToMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
