import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoryPageComponent } from './show-category-page.component';

describe('ShowCategoryPageComponent', () => {
  let component: ShowCategoryPageComponent;
  let fixture: ComponentFixture<ShowCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCategoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
