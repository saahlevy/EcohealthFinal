import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./folder/inbox/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'orientacoes',
    loadChildren: () =>
      import('./folder/outbox/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'mapa',
    loadChildren: () =>
      import('./folder/favorites/folder.module').then(
        (m) => m.FolderPageModule
      ),
  },
  {
    path: 'configuracoes',
    loadChildren: () =>
      import('./folder/archived/folder.module').then(
        (m) => m.FolderPageModule
      ),
  },
  {
    path: 'reportar',
    loadChildren: () =>
      import('./folder/spam/folder.module').then(
        (m) => m.FolderPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
