import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteList } from './pages/cliente-list/cliente-list';
import { ClienteAdd } from './pages/cliente-add/cliente-add';
import { ClienteEdit } from './pages/cliente-edit/cliente-edit';

const routes: Routes = [
  {
    path: 'list',
    component: ClienteList,
  },
  {
    path: 'agregar',
    component: ClienteAdd
  },
  {
    path:'edit/:id',
    component: ClienteEdit
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  declarations: [],
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ClienteRoutingModule {}
