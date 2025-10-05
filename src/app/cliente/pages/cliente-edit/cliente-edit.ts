import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-cliente-edit',
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    NzCardModule,
  ],
  templateUrl: './cliente-edit.html',
  styleUrl: './cliente-edit.css',
})
export class ClienteEdit implements OnInit {
  id!: number;
  nombres: string = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCliente();
  }

  loadCliente(): void {
    this.loading = true;
    this.clienteService.getById(this.id).subscribe({
      next: (res: any) => {
        console.log('response: ', res);
        this.nombres = res.data.nombres;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar cliente:', err);
        this.message.error('No se pudo cargar el cliente');
        this.loading = false;
      },
    });
  }

  save(): void {
    const body = { nombres: this.nombres };
    this.clienteService.edit(this.id, body).subscribe({
      next: () => {
        this.message.success('Cliente actualizado con éxito');
        this.router.navigate(['/cliente/list']);
      },
      error: (err) => {
        console.error('Error al actualizar cliente:', err);
        this.message.error('No se pudo actualizar el cliente');
      },
    });
  }
}
