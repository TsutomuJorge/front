import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioProdutoComponent } from '../formulario-produto/formulario-produto.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams, RowNode } from 'ag-grid-community';
import { TYPE_BUTTON_ACTION } from '../../constants/type-button-action';
import { ProdutoFabricanteDTO } from '../../dtos/produto-fabricante-dto';
import { produtosFabricantesService } from 'src/app/core/services/produtos-fabricantes/produtos-fabricantes.service';
import { ProdutoFabricanteService } from '../../services/produto-fabricante.service';
import { ProdutosComponent } from '../../produtos.component';

@Component({
  selector: 'app-dialog-grid',
  templateUrl: './dialog-grid.component.html',
  styleUrls: ['./dialog-grid.component.scss'],
})
export class DialogGridComponent implements ICellRendererAngularComp {
  public values!: ProdutoFabricanteDTO;
  public typeButtonAction = TYPE_BUTTON_ACTION;
  private gridApi!: GridApi;
  private node!: RowNode;
  private componentParent!: ProdutosComponent;

  constructor(
    public dialog: MatDialog,
    private service: ProdutoFabricanteService
  ) {}

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.values = params.data;
    this.gridApi = params.api;
    this.node = params.node as RowNode;
    this.componentParent = params?.context?.componentParent;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    typeButtonAction: TYPE_BUTTON_ACTION
  ): void {
    this.dialog.open(FormularioProdutoComponent, {
      minWidth: '80vh',
      height: 'auto',
      data: {
        dadosGrid: this.values,
        fabricantes:
          produtosFabricantesService.obterFabricantesPorChaveDescricao(),
        produtos: produtosFabricantesService.obterProdutosPorChaveDescricao(),
        typeButtonAction: typeButtonAction,
        titleForm: typeButtonAction,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  removerLinhaDaGrid() {
    this.componentParent.excluirProdutoFabricante(this.values);
  }
}
