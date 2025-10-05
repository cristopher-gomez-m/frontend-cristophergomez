import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AtencionService } from '../../services/atencion.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-atencion-add',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    NzCardModule,
  ],
  templateUrl: './atencion-add.html',
  styleUrl: './atencion-add.css',
})
export class AtencionAdd implements OnInit {
  atencionForm!: FormGroup;
  
  constructor(
    private atencionService: AtencionService,
    private router: Router,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.atencionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(0)]],
    });
  }

  save(): void {
    if (this.atencionForm.invalid) {
      this.atencionForm.markAllAsTouched();
      return;
    }

    this.atencionService.save(this.atencionForm.value).subscribe({
      next: () => {
        this.message.success('Atención creada con éxito');
        this.router.navigate(['/atencion/list']);
      },
      error: (err) => {
        console.error('Error al crear atención:', err);
        this.message.error('No se pudo crear la atención');
      },
    });
  }
}
