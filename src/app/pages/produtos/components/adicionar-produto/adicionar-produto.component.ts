import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { produtosFabricantesService } from 'src/app/core/services/produtos-fabricantes/produtos-fabricantes.service';
import { TYPE_BUTTON_ACTION } from '../../constants/type-button-action';
import { FormularioProdutoComponent } from '../formulario-produto/formulario-produto.component';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.scss'],
})
export class AdicionarProdutoComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(FormularioProdutoComponent, {
      minWidth: '80vh',
      height: 'auto',
      data: {
        fabricantes:
          produtosFabricantesService.obterFabricantesPorChaveDescricao(),
        produtos: produtosFabricantesService.obterProdutosPorChaveDescricao(),
        typeButtonAction: TYPE_BUTTON_ACTION.ADICIONAR,
      },
    });
  }
}
