import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cliente-add',
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    NzCardModule,
  ],
  templateUrl: './cliente-add.html',
  styleUrl: './cliente-add.css',
})
export class ClienteAdd {
  nombres: string = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private message: NzMessageService
  ) {}

  save() {
    const body = { nombres: this.nombres };
    this.clienteService.save(body).subscribe({
      next: () => {
        this.message.success('Cliente creado con éxito');
        this.router.navigate(['/cliente/list']);
      },
      error: (err) => {
        console.error('Error al crear cliente:', err);
        this.message.error('No se pudo crear el cliente');
      },
    });
  }
}
