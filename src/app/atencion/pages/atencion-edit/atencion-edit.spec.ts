import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionEdit } from './atencion-edit';

describe('AtencionEdit', () => {
  let component: AtencionEdit;
  let fixture: ComponentFixture<AtencionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
