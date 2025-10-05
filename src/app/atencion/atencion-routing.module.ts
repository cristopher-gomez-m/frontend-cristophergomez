import { RouterModule, Routes } from '@angular/router';
import { AtencionList } from './pages/atencion-list/atencion-list';
import { AtencionAdd } from './pages/atencion-add/atencion-add';
import { AtencionEdit } from './pages/atencion-edit/atencion-edit';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'list',
    component: AtencionList,
  },
  {
    path: 'agregar',
    component: AtencionAdd,
  },
  {
    path: 'edit/:id',
    component: AtencionEdit,
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
export class AtencionRoutingModule {}
