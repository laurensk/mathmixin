import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTextInputComponent } from './modal-text-input.component';

describe('ModalTextInputComponent', () => {
  let component: ModalTextInputComponent;
  let fixture: ComponentFixture<ModalTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTextInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
