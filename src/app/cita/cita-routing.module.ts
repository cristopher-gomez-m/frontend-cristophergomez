import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaList } from './pages/cita-list/cita-list';
import { CitaAdd } from './pages/cita-add/cita-add';
import { CitaEdit } from './pages/cita-edit/cita-edit';

const routes: Routes = [
  {
    path: 'list',
    component: CitaList,
  },
  {
    path: 'agregar',
    component: CitaAdd,
  },
  {
    path: 'edit/:id',
    component: CitaEdit
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitaRoutingModule {}
