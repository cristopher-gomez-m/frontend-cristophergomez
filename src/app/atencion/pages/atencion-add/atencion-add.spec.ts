import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionAdd } from './atencion-add';

describe('AtencionAdd', () => {
  let component: AtencionAdd;
  let fixture: ComponentFixture<AtencionAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
