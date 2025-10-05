import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAdd } from './cliente-add';

describe('ClienteAdd', () => {
  let component: ClienteAdd;
  let fixture: ComponentFixture<ClienteAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
