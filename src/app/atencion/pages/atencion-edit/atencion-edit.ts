import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AtencionService } from '../../services/atencion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atencion-edit',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzCardModule,
  ],
  templateUrl: './atencion-edit.html',
  styleUrl: './atencion-edit.css',
})
export class AtencionEdit implements OnInit {
  atencionForm!: FormGroup;
  atencionId!: number;

  constructor(
    private fb: FormBuilder,
    private atencionService: AtencionService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.atencionId = Number(this.route.snapshot.paramMap.get('id'));

    this.atencionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(0)]],
    });

    // Traer la atención por id
    this.atencionService.getById(this.atencionId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.atencionForm.patchValue({
          nombre: res.data.nombre,
          precio: res.data.precio,
        });
      },
      error: (err) => {
        console.error('Error al cargar atención:', err);
        this.message.error('No se pudo cargar la atención');
      },
    });
  }

  save(): void {
    if (this.atencionForm.invalid) {
      this.atencionForm.markAllAsTouched();
      return;
    }

    this.atencionService
      .edit(this.atencionId, this.atencionForm.value)
      .subscribe({
        next: () => {
          this.message.success('Atención actualizada con éxito');
          this.router.navigate(['/atencion/list']);
        },
        error: (err) => {
          console.error('Error al actualizar atención:', err);
          this.message.error('No se pudo actualizar la atención');
        },
      });
  }
}
