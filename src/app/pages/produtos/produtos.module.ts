import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { AutoCompleteComBuscaComponent } from './components/auto-complete-com-pesquisa/auto-complete-com-busca.component';
import { FormularioProdutoComponent } from './components/formulario-produto/formulario-produto.component';
import { DialogGridComponent } from './components/dialog-grid/dialog-grid.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnexarArquivoComponent } from './components/anexar-arquivo/anexar-arquivo.component';
import { AdicionarProdutoComponent } from './components/adicionar-produto/adicionar-produto.component';

@NgModule({
  declarations: [
    ProdutosComponent,
    AutoCompleteComBuscaComponent,
    FormularioProdutoComponent,
    DialogGridComponent,
    AnexarArquivoComponent,
    AdicionarProdutoComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    RouterModule.forChild([{ path: '', component: ProdutosComponent }]),
    SharedModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }, // Pode inicializar com valores padrão se necessário
  ],
})
export class ProdutosModule { }
