import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookUPEditComponent } from './look-upedit.component';

describe('LookUPEditComponent', () => {
  let component: LookUPEditComponent;
  let fixture: ComponentFixture<LookUPEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookUPEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookUPEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
