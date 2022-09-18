import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductslideComponent } from './productslide.component';

describe('ProductslideComponent', () => {
  let component: ProductslideComponent;
  let fixture: ComponentFixture<ProductslideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductslideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
