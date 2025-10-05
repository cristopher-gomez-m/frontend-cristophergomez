import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { CitaService } from '../../services/cita.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AtencionService } from '../../../atencion/services/atencion.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-cita-add',
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzFormModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzTableModule,
  ],
  templateUrl: './cita-add.html',
  styleUrl: './cita-add.css',
})
export class CitaAdd implements OnInit {
  fecha: Date | null = null;
  hora: Date | null = null;
  clienteId: number | null = null;
  clientes: any[] = [];
  atenciones: any[] = [];
  atencionId: number | null = null;
  detalles: any[] = [];

  constructor(
    private clienteService: ClienteService,
    private atencionService: AtencionService,
    private citaService: CitaService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.clienteService.getAll('?per_page=100').subscribe((res: any) => {
      this.clientes = res.data;
    });

    this.atencionService.getAll('?per_page=100').subscribe((res: any) => {
      this.atenciones = res.data;
    });
  }

  agregarDetalle() {
    if (!this.atencionId) return;
    const atencion = this.atenciones.find((a) => a.id === this.atencionId);
    if (!atencion) return;

    // Evitar duplicados
    if (this.detalles.some((d) => d.atencion_id === atencion.id)) return;

    this.detalles.push({
      atencion_id: atencion.id,
      nombre: atencion.nombre,
      precio: atencion.precio,
    });

    this.atencionId = null;
  }

  eliminarDetalle(index: number) {
    this.detalles.splice(index, 1);
  }

  save() {
    if (!this.fecha || !this.hora || !this.clienteId) {
      this.message.warning('Completa todos los campos');
      return;
    }

    // Convierte a string sin zona horaria
    const fechaLocal = this.fecha.toISOString().split('T')[0]; // yyyy-mm-dd
    const horaLocal = this.hora.toLocaleTimeString('es-ES', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    }); // HH:mm

    const body = {
      fecha: fechaLocal,
      hora: horaLocal,
      cliente_id: this.clienteId,
      detalle: this.detalles.map((d) => ({ atencion_id: d.atencion_id })),
    };

    this.citaService.save(body).subscribe({
      next: () => {
        this.message.success('Cita creada con éxito');
        this.router.navigate(['/cita/list']);
      },
      error: (err) => {
        console.error('Error al crear cita:', err);
        this.message.error('No se pudo crear la cita');
      },
    });
  }
}
