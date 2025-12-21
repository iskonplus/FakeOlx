import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdsPageComponent } from './create-ads-page.component';

describe('CreateAdsPageComponent', () => {
  let component: CreateAdsPageComponent;
  let fixture: ComponentFixture<CreateAdsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
