import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionList } from './atencion-list';

describe('AtencionList', () => {
  let component: AtencionList;
  let fixture: ComponentFixture<AtencionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
