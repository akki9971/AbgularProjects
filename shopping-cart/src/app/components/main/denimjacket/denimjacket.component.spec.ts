import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenimjacketComponent } from './denimjacket.component';

describe('DenimjacketComponent', () => {
  let component: DenimjacketComponent;
  let fixture: ComponentFixture<DenimjacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenimjacketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenimjacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
