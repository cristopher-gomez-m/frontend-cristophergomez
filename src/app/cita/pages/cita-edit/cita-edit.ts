import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { CitaService } from '../../services/cita.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AtencionService } from '../../../atencion/services/atencion.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-cita-edit',
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
  templateUrl: './cita-edit.html',
  styleUrl: './cita-edit.css',
})
export class CitaEdit implements OnInit {
  id!: number;
  fecha: Date | null = null;
  hora: Date | null = null;
  clienteId: number | null = null;
  clientes: any[] = [];
  loading = false;
  atenciones: any[] = [];
  detallesExistentes: any[] = []; // Detalles cargados desde backend
  detallesNuevo: any[] = [];
  detallesEliminar: any[] = [];
  atencionId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private clienteService: ClienteService,
    private atencionService: AtencionService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClientes();
    this.loadCita();
    this.loadAtenciones();
  }

  loadClientes() {
    this.clienteService.getAll('?per_page=100').subscribe((res: any) => {
      this.clientes = res.data;
    });
  }

  loadAtenciones() {
    this.atencionService.getAll('?per_page=100').subscribe((res: any) => {
      this.atenciones = res.data;
    });
  }
  loadCita() {
    this.loading = true;
    this.citaService.getById(this.id).subscribe({
      next: (res: any) => {
        const data = res.data;
        this.fecha = new Date(data.fecha);
        this.hora = this.parseHora(data.hora);
        this.clienteId = data.cliente_id;
        this.detallesExistentes = data.detalles;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('No se pudo cargar la cita');
      },
    });
  }

  private parseHora(horaStr: string): Date {
    // Convierte "HH:mm" → Date local
    const [hours, minutes] = horaStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  agregarDetalle() {
    if (!this.atencionId) return;

    const atencion = this.atenciones.find((a) => a.id === this.atencionId);
    if (!atencion) return;

    // Evitar duplicados
    const existe = this.detallesExistentes.some(
      (d) => d.atencion_id === atencion.id
    );
    if (existe) return;

    const nuevoDetalle = {
      atencion_id: atencion.id,
      nombre: atencion.nombre,
      precio: atencion.precio,
    };

    // Agregar tanto a detallesExistentes como a detallesNuevo
    this.detallesExistentes.push(nuevoDetalle);
    this.detallesNuevo.push(nuevoDetalle);

    this.atencionId = null;
  }

  eliminarDetalleTabla(d: any) {
    // 1️⃣ Eliminar de detallesExistentes
    const indexExistente = this.detallesExistentes.findIndex((x) =>
      x.id ? x.id === d.id : x.atencion_id === d.atencion_id
    );
    if (indexExistente >= 0) {
      this.detallesExistentes.splice(indexExistente, 1);
    }

    // 2️⃣ Eliminar también de detallesNuevo si existe
    const indexNuevo = this.detallesNuevo.findIndex(
      (x) => x.atencion_id === d.atencion_id
    );
    if (indexNuevo >= 0) {
      this.detallesNuevo.splice(indexNuevo, 1);
    }

    // 3️⃣ Si el detalle tiene ID (viene del backend), agregar a detallesEliminar
    if (d.id && !this.detallesEliminar.includes(d.id)) {
      this.detallesEliminar.push(d.id);
    }
  }

  save() {
    if (!this.fecha || !this.hora || !this.clienteId) {
      this.message.warning('Completa todos los campos');
      return;
    }

    const fechaLocal = this.fecha.toISOString().split('T')[0];
    const horaLocal = this.hora.toLocaleTimeString('es-ES', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    const body = {
      fecha: fechaLocal,
      hora: horaLocal,
      cliente_id: this.clienteId,
      detalleNuevo: this.detallesNuevo.map((d) => ({
        atencion_id: d.atencion_id,
      })),
      detalleEliminar: this.detallesEliminar || [],
    };

    this.citaService.edit(this.id, body).subscribe({
      next: () => {
        this.message.success('Cita actualizada con éxito');
        this.router.navigate(['/cita/list']);
      },
      error: (err) => {
        console.error('Error al actualizar cita:', err);
        this.message.error('No se pudo actualizar la cita');
      },
    });
  }
}
