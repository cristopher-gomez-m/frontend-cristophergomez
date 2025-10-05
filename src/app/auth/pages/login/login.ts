import { Component } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Auth } from '../../services/auth';
import { SessionService } from '../../../core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
  ],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private authService: Auth,
    private sessionService: SessionService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async login() {
    const { email, password } = this.loginForm.value;
    try {
      const body = { email, password };
      const response = await this.authService.login(body);
      const token = response.data.token;
      this.sessionService.setToken(token);
      //console.log('login: ', response);
      this.message.success('inicio de sesión exitoso');
      this.router.navigate(['/cliente/list']);
    } catch (error: any) {
      console.log(error);
      this.message.error(error.error.message || 'Error al iniciar sesión');
    }
  }

  goToRegister():void{
    this.router.navigate(['/auth/register'])
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.login();
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      this.message.error('Por favor complete los campos requeridos');
    }
  }
}
