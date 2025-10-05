import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-cliente-list',
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    RouterModule,
    NzPopconfirmModule,
    NzModalModule,
  ],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css',
})
export class ClienteList implements OnInit {
  clientes: any[] = [];
  loading = false;
  total = 0;
  pageSize = 10;
  pageIndex = 1;

  searchText = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {}

  loadData(): void {
    this.loading = true;

    let qs = `?page=${this.pageIndex}&per_page=${this.pageSize}`;
    if (this.searchText.trim() !== '') {
      qs += `&q=${encodeURIComponent(this.searchText.trim())}`;
    }

    this.clienteService.getAll(qs).subscribe({
      next: (res: any) => {
        this.clientes = res.data || [];
        this.total = res.pagination?.total || this.clientes.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        this.loading = false;
      },
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData();
  }

  search(): void {
    this.pageIndex = 1;
    this.loadData();
  }

  goToCreate(): void {
    this.router.navigate(['/cliente/agregar']);
  }

  deleteCliente(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este cliente?',
      nzOkText: 'Sí',
      nzOkType: 'primary', // tipo válido
      nzOkDanger: true, // hace que el botón sea rojo
      nzCancelText: 'No',
      nzOnOk: () => {
        this.clienteService.delete(id).subscribe({
          next: () => {
            this.message.success('Cliente eliminado con éxito');
            this.loadData(); // recarga la tabla
          },
          error: () => {
            this.message.error('No se pudo eliminar el cliente');
          },
        });
      },
    });
  }
}
