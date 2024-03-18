import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-paginacao-especifica',
  templateUrl: './paginacao-especifica.component.html',
  styleUrls: ['./paginacao-especifica.component.scss']
})
export class PaginacaoEspecificaComponent implements OnInit {
  @Input() gridOptions!: Partial<GridOptions>;

  public paginacaoEspecificaForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.paginacaoEspecificaForm = this.fb.group({
      paginaCtrl: ['']
    });
  }

  validarPagina(caracter: any) {
    if (caracter == 13) {
      const paginaAtual = this.paginacaoEspecificaForm!.get('paginaCtrl')!.value;
      if (paginaAtual) {
        this.irParaPagina(paginaAtual);
      }
    }
    return caracter >= 48 && caracter < 58;
  }

  irParaPagina(paginaAtual: number) {
    // if (paginaAtual) {
    //   if (paginaAtual > +this.gridOptions!.api!.paginationGetTotalPages()) {
    //     paginaAtual = +this.gridOptions!.api!.paginationGetTotalPages();
    //   }
    //   this.gridOptions!.api!.paginationGoToPage(paginaAtual - 1);
    //   this.gridOptions
    // }
  }

}
