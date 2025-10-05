import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEdit } from './cliente-edit';

describe('ClienteEdit', () => {
  let component: ClienteEdit;
  let fixture: ComponentFixture<ClienteEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
