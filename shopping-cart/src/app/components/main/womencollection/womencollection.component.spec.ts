import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomencollectionComponent } from './womencollection.component';

describe('WomencollectionComponent', () => {
  let component: WomencollectionComponent;
  let fixture: ComponentFixture<WomencollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomencollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WomencollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
