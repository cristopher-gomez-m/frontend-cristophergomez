import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSpinModule,
    RouterModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private authService: Auth,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async register() {
    const { email, password } = this.registerForm.value;
    try {
      this.loading = true;
      const body = { email, password };
      const response = await this.authService.register(body);
      this.message.success('Usuario registrado exitosamente');
      this.router.navigate(['/auth/login']);
    } catch (error: any) {
      console.log(error?.error?.error);
      if (error?.error?.error) {
        // Laravel ValidationException
        const messages = Object.values(error.error.error).flat().join(' | ');
        this.message.error(messages);
      } else {
        this.message.error(
          error.error?.message || 'Error al registrar usuario'
        );
      }
    } finally {
      this.loading = false;
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.register();
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      this.message.error('Por favor completa los campos requeridos');
    }
  }
}
