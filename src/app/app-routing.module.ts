import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROTAS_PRODUTOS } from './pages/produtos/rotas-produtos';

export const APP_ROUTES: Routes = [
  ...ROTAS_PRODUTOS,
];
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
