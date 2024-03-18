import { Component, ViewChild } from '@angular/core';
import {
  GridApi,
  GridReadyEvent,
  ColDef,
  GridOptions,
  GetRowIdParams,
  GetRowIdFunc,
} from 'ag-grid-community';
import { colDefs } from './column-defs';
import { localeEs } from 'src/assets/locale.es';
import { ProdutoFabricanteService } from './services/produto-fabricante.service';
import { ProdutoFabricanteDTO } from './dtos/produto-fabricante-dto';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { FabricanteDTO } from './dtos/fabricante-dto';
import { ProdutoDTO } from './dtos/produto-dto';
import { produtosFabricantesService } from 'src/app/core/services/produtos-fabricantes/produtos-fabricantes.service';
import { CalculosMatematicos } from 'src/app/shared/utils/calculos-matematicos';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var AG_GRID_LOCALE_ZZZ: {
  [key: string]: string;
};

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent {
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  public api!: GridApi;
  public themeClass = 'ag-theme-quartz';
  public colDefs = colDefs;
  public defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
  };
  public gridOptions!: Partial<GridOptions>;
  public localeText: {
    [key: string]: string;
  } = localeEs;
  public loading = false;
  public arquivoAnexado: any;
  public rowData: ProdutoFabricanteDTO[] = [];
  public habilitarExportacao = false;

  constructor(
    private produtoFabricanteService: ProdutoFabricanteService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarDadosGrid();
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    };
    produtosFabricantesService
      .verificarSeNecessarioRecarregarDadosGrid()
      .subscribe((x) => {
        if (x) {
          this.carregarDadosGrid();
        }
      });
  }

  public onGridReady = (event: GridReadyEvent) => {
    this.api = event.api;
    this.api.autoSizeAllColumns();
  };

  public importarArquivo(importadoComSucesso: boolean): void {
    if (importadoComSucesso) {
      this.carregarDadosGrid();
    }
    this.loadingComponent.close();
    this.loading = false;
  }

  private carregarDadosGrid(): void {
    this.loading = true;
    this.produtoFabricanteService
      .getProdutosFabricantes()
      .pipe(
        finalize(() => {
          this.loadingComponent.close();
          this.loading = false;
        })
      )
      .subscribe(
        (x) => {
          this.rowData = x;
          this.obterProdutosGrid(this.rowData);
          this.obterFabricantesGrid(this.rowData);
        },
        () => {
          this._snackBar.open('Ocorreu um erro ao obter os dados.', 'fechar');
        }
      );
  }

  private obterFabricantesGrid(rowsData: ProdutoFabricanteDTO[]): void {
    const fabricantes = rowsData.map(
      (x) =>
        ({
          idFabricante: x.idFabricante,
          nomeFabricante: x.nomeFabricante,
        } as FabricanteDTO)
    );
    produtosFabricantesService.limparFabricantes();
    const fabricantesFiltrados = this.filtrarFabricantesPorNome(fabricantes);
    fabricantesFiltrados.forEach((x) =>
      produtosFabricantesService.adicionarFabricante(x)
    );
  }

  public excluirProdutoFabricante(row: ProdutoFabricanteDTO) {
    this.loading = true;
    this.produtoFabricanteService
      .deleteProdutoFabricante(row)
      .pipe(
        finalize(() => {
          this.loadingComponent.close();
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          const itemsToUpdate: any[] = [];
          itemsToUpdate.push(row);
          this.api.applyTransaction({ remove: itemsToUpdate });
        },
        () => {
          this._snackBar.open(
            'Erro ao excluir o dado, tente novamente',
            'fechar'
          );
        }
      );
  }

  public exportarLinhasPreenchidas(): void {
    // const rows: any[] = [];
    // this.api.forEachNode((x) => rows.push(x.data));

    // const filledData = rows.filter((row) => {
    //   const result = row as any;
    //   return !!result?.quantidade;
    // });

    this.api.exportDataAsCsv({
      fileName: 'linhas_preenchidas.csv',
      processHeaderCallback: this.processHeaderCallback.bind(this),
      onlySelected: false,
      columnSeparator: ';',
      //processCellCallback: this.processCellCallback.bind(this, filledData),
      shouldRowBeSkipped: (row) => {
        return !row.node.data?.quantidade;
      },
    });
  }

  private processHeaderCallback(params: any): any {
    const colDef = params.column.getColDef();
    return colDef.field == 'Ação' || colDef.headerName == 'Row ID'
      ? ''
      : `${colDef.headerName ?? colDef.field}`;
  }

  private processCellCallback(filledData: any[], params: any): any {
    const field = params.column.getColDef().field;
    return filledData?.length > params.node.rowIndex
      ? params.node.data[field]
      : '';
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

  public onCellValueChanged(event: any): void {
    this.existeQuantidadePreenchida();
    const quantidade = event.data?.quantidade;
    const data = event.data;

    const valorTotal = CalculosMatematicos.multiplicar(
      data.valorUnitario,
      quantidade
    );

    const valorTotalMinimo = CalculosMatematicos.multiplicar(
      data.valorMinimo,
      quantidade
    );

    const custoTotal = CalculosMatematicos.multiplicar(
      data.custoUnitario,
      quantidade
    );

    const lcMin = CalculosMatematicos.subtrair(valorTotalMinimo, custoTotal);

    const lcMAx = CalculosMatematicos.subtrair(valorTotal, custoTotal);

    const linhaAtualizada = {
      ...event.data,
      valorTotal: valorTotal,
      valorTotalMinimo: valorTotalMinimo,
      custoTotal: custoTotal,
      lcMin: lcMin,
      lcMAx: lcMAx,
    };

    this.api.applyTransaction({ update: [linhaAtualizada] });
  }

  private existeQuantidadePreenchida(): void {
    let valorEstaPresente = false;

    this.api.forEachNode((node) => {
      if (!!node.data?.quantidade) {
        valorEstaPresente = true;
      }
    });

    this.habilitarExportacao = valorEstaPresente;
  }

  private filtrarFabricantesPorNome(
    fabricantes: FabricanteDTO[]
  ): FabricanteDTO[] {
    const mapaNomes = new Map<string, FabricanteDTO>();

    fabricantes.forEach((fabricante) => {
      const chave = fabricante.nomeFabricante.toLowerCase();
      if (!mapaNomes.has(chave)) {
        mapaNomes.set(chave, fabricante);
      }
    });

    return Array.from(mapaNomes.values());
  }

  private obterProdutosGrid(rowsData: ProdutoFabricanteDTO[]): void {
    const produtos = rowsData.map(
      (x) =>
        ({
          idProduto: x.idProduto,
          descricaoProduto: x.descricaoProduto,
        } as ProdutoDTO)
    );

    produtosFabricantesService.limparProdutos();
    const produtosFiltrados = this.filtrarProdutosPorNome(produtos);
    produtosFiltrados.forEach((x) =>
      produtosFabricantesService.adicionarProdutos(x)
    );
  }

  private filtrarProdutosPorNome(produtos: ProdutoDTO[]): ProdutoDTO[] {
    const mapaNomes = new Map<string, ProdutoDTO>();

    produtos.forEach((produto) => {
      const chave = produto.descricaoProduto.toLowerCase();
      if (!mapaNomes.has(chave)) {
        mapaNomes.set(chave, produto);
      }
    });

    return Array.from(mapaNomes.values());
  }
}
