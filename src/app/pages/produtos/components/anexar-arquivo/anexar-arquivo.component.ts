import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ArquivoUploadService } from '../../services/arquivo-upload.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anexar-arquivo',
  templateUrl: './anexar-arquivo.component.html',
  styleUrls: ['./anexar-arquivo.component.scss'],
})
export class AnexarArquivoComponent implements OnInit {
  @Output() regarregarTela = new EventEmitter<boolean>();
  @ViewChild(LoadingComponent) loadingComponent!: LoadingComponent;
  public arquivoAnexado: any;
  public loading!: boolean;

  constructor(
    private arquivoUploadService: ArquivoUploadService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  fileInputClick = (event: any) => {
    let posicaoSelecaoValida =
      event?.layerX >= 249 &&
      event?.layerX <= 305 &&
      event?.layerY >= 29 &&
      event?.layerY <= 44;
    if (posicaoSelecaoValida) {
      return true;
    } else {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  };

  mudarArquivo(e: any): void {
    this.arquivoAnexado = {
      arquivo: e.target.files[0],
      nomeArquivo: e.target.files[0].name,
    };
  }

  onArquivoSelecionado(event: any): void {
    const arquivo: File = this.arquivoAnexado?.arquivo;
    if (arquivo) {
      this.loading = true;
      this.arquivoUploadService
        .uploadArquivo(arquivo)
        .pipe(
          finalize(() => {
            this.loadingComponent.close();
            this.loading = false;
          })
        )
        .subscribe(
          (resposta) => {
            console.log('Arquivo enviado com sucesso:', resposta);
            this.regarregarTela.emit(true);
          },
          (erro) => {
            console.error('Erro ao enviar o arquivo:', erro);
            this._snackBar.open(
              'Erro ao enviar o arquivo, tente novamente.',
              'fechar'
            );
            this.regarregarTela.emit(false);
          }
        );
    }
  }
}
