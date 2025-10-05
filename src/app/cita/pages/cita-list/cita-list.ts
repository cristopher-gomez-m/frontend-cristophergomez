import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-cita-list',
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
  templateUrl: './cita-list.html',
  styleUrl: './cita-list.css',
})
export class CitaList {
  citas: any[] = [];
  loading = false;
  total = 0;
  pageSize = 10;
  pageIndex = 1;

  searchText = '';

  constructor(
    private citaService: CitaService,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  loadData(): void {
    this.loading = true;

    let qs = `?page=${this.pageIndex}&per_page=${this.pageSize}`;
    if (this.searchText.trim() !== '') {
      qs += `&q=${encodeURIComponent(this.searchText.trim())}`;
    }

    this.citaService.getAll(qs).subscribe({
      next: (res: any) => {
        this.citas = res.data || [];
        this.total = res.pagination?.total || this.citas.length;
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
    this.router.navigate(['/cita/agregar']);
  }

  deleteCita(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar esta cita?',
      nzOkText: 'Sí',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'No',
      nzOnOk: () => {
        this.citaService.delete(id).subscribe({
          next: () => {
            this.message.success('Cita eliminado con éxito');
            this.loadData(); // recarga la tabla
          },
          error: () => {
            this.message.error('No se pudo eliminar la cita');
          },
        });
      },
    });
  }
}
