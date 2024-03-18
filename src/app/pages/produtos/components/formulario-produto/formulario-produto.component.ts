import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  TYPE_BUTTON_ACTION,
  getTextTypeButtonAction,
} from '../../constants/type-button-action';
import { ProdutoFabricanteDTO } from '../../dtos/produto-fabricante-dto';
import { ChaveDescricaoDTO } from 'src/app/shared/dtos/chave-descricao.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoFabricanteService } from '../../services/produto-fabricante.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { finalize } from 'rxjs';
import { produtosFabricantesService } from 'src/app/core/services/produtos-fabricantes/produtos-fabricantes.service';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.scss'],
})
export class FormularioProdutoComponent implements OnInit {
  @ViewChild('inputFabricante') inputFabricante!: ElementRef<HTMLInputElement>;
  @ViewChild('inputProduto') inputProduto!: ElementRef<HTMLInputElement>;
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  @Input() titleForm: string = '';
  public form: FormGroup;
  public typeButtonAction: TYPE_BUTTON_ACTION;
  public dadosGrid: ProdutoFabricanteDTO;
  public fabricantes: ChaveDescricaoDTO[] = [];
  public produtos: ChaveDescricaoDTO[] = [];
  public filteredOptionsFabricantes: ChaveDescricaoDTO[] = [];
  public filteredOptionsProdutos: ChaveDescricaoDTO[] = [];
  public loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: ProdutoFabricanteService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormularioProdutoComponent>
  ) {
    this.fabricantes = data?.fabricantes;
    this.produtos = data?.produtos;
    this.dadosGrid = data?.dadosGrid;
    this.typeButtonAction = data?.typeButtonAction;
    this.titleForm = getTextTypeButtonAction(data?.typeButtonAction);
    this.form = this.fb.group({
      produto: ['', Validators.required],
      fabricante: ['', Validators.required],
      valorUnitario: ['', Validators.required],
      custoUnitario: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.filteredOptionsFabricantes = this.fabricantes;
    this.filteredOptionsProdutos = this.produtos;
    if (this.typeButtonAction == TYPE_BUTTON_ACTION.EDITAR) {
      this.form.setValue({
        produto: {
          chave: this.dadosGrid?.idProduto,
          descricao: this.dadosGrid?.descricaoProduto,
        } as ChaveDescricaoDTO,
        fabricante: {
          chave: this.dadosGrid?.idFabricante,
          descricao: this.dadosGrid?.nomeFabricante,
        } as ChaveDescricaoDTO,
        valorUnitario: this.dadosGrid?.valorUnitario,
        custoUnitario: this.dadosGrid?.custoUnitario,
      });
    }
  }

  public filterFabricantes() {
    const value = this.inputFabricante.nativeElement.value.toLowerCase();
    const filterValue = value.toLowerCase();

    this.filteredOptionsFabricantes = this.fabricantes.filter((option) =>
      option.descricao.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  public filterProdutos() {
    const value = this.inputProduto.nativeElement.value.toLowerCase();
    const filterValue = value.toLowerCase();

    this.filteredOptionsProdutos = this.produtos.filter((option) =>
      option.descricao.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  public obterFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  public handleSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const dto = {
        id: this.dadosGrid?.id,
        idFabricante: this.form.value?.fabricante?.chave,
        nomeFabricante:
          this.form.value?.fabricante?.descricao || this.form.value?.fabricante,
        idProduto: this.form.value?.produto?.chave,
        descricaoProduto:
          this.form.value?.produto?.descricao || this.form.value?.produto,
        custoUnitario: this.form.value?.custoUnitario,
        valorUnitario: this.form.value?.valorUnitario,
      } as ProdutoFabricanteDTO;
      if (this.typeButtonAction == TYPE_BUTTON_ACTION.EDITAR) {
        this.service
          .updateProdutoFabricante(dto)
          .pipe(
            finalize(() => {
              this.loadingComponent.close();
              this.loading = false;
            })
          )
          .subscribe(
            () => {
              produtosFabricantesService.executarRecarregarDadosGrid(true);
              this.dialogRef.close();
              this._snackBar.open('Dado atualizado com sucesso!', 'fechar');
            },
            (error) => {
              this._snackBar.open(
                'Ocorreu um erro ao atualizar, tente novamente.',
                'fechar'
              );
              console.log(error);
            }
          );
      } else {
        this.service
          .addProdutoFabricante(dto)
          .pipe(
            finalize(() => {
              this.loadingComponent.close();
              this.loading = false;
            })
          )
          .subscribe(
            () => {
              produtosFabricantesService.executarRecarregarDadosGrid(true);
              this.dialogRef.close();
              this._snackBar.open('Dado adicionado com sucesso!', 'fechar');
            },
            () => {
              this._snackBar.open(
                'Ocorreu um erro ao adicionar, tente novamente.',
                'fechar'
              );
            }
          );
      }
    } else {
      this._snackBar.open('Preencha todos os campos.', 'fechar');
    }
  }

  public renderizarPeriodoAutocomplete(obj: ChaveDescricaoDTO): string {
    return !!obj && obj.descricao ? obj.descricao : '';
  }
}
