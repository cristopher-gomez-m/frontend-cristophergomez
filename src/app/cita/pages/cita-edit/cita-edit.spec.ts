import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaEdit } from './cita-edit';

describe('CitaEdit', () => {
  let component: CitaEdit;
  let fixture: ComponentFixture<CitaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
