import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaAdd } from './cita-add';

describe('CitaAdd', () => {
  let component: CitaAdd;
  let fixture: ComponentFixture<CitaAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
