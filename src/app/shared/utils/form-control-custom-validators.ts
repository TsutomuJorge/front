import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import moment from "moment";
import { RS_MENS_003 } from "./constants";
import { Util } from "./util";

const mensagemMesAnoMenorQueMesAnoCorrente = (mesAno: string, mesAnoCorrente: string) => `Mês/Ano Referência ${mesAno} deve ser menor que o mês/ano corrente ${mesAnoCorrente}`;
const mensagemAnoMenorQueAnoCorrente = (ano: number, anoCorrente: number) => `Ano ${ano} deve ser menor que o ano corrente ${anoCorrente}`;
export class FormControCustomValidators {


  public static dataMininaMesAno(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = Util.converterStringParaData(`01/${date}`);

      return new Date(control.value) >= validationDate ? null : {
        'dataMinima': {
          'anterior': validationDate,
          'atual': controlDate
        }
      };
    };
  }

  public static mesAnoDeverSerMenorQueMesAnoCorrente(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value);

      if (!controlDate.isValid()) {
        return null;
      }

      const dataFormCtrl = new Date(control.value);
      const validationDate = new Date(date);

      const data = this.adicionarZeroAoMes((dataFormCtrl.getMonth() + 1) + '/' + dataFormCtrl.getFullYear());
      const dataCorrente = this.adicionarZeroAoMes((validationDate.getMonth() + 1) + '/' + validationDate.getFullYear());

      return dataFormCtrl < validationDate ? null : {
        'mesAno': mensagemMesAnoMenorQueMesAnoCorrente(data, dataCorrente)
      };
    };
  }

  private static adicionarZeroAoMes(mesAno: string): string {
    const mesAnoArray = mesAno?.split('/');
    if (Number(mesAnoArray[0]) < 10) {
      return `0${mesAnoArray[0]}/${mesAnoArray[1]}`;
    }
    return mesAno
  }

  public static anoDeverSerMenorQueAnoCorrente(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value);

      if (!controlDate.isValid()) {
        return null;
      }

      const dataFormCtrl = new Date(control.value);
      const validationDate = new Date(date);
      const ano = dataFormCtrl.getFullYear();
      const anoCorrente = validationDate.getFullYear();

      return dataFormCtrl?.getFullYear() < validationDate?.getFullYear() ? null : {
        'ano': mensagemAnoMenorQueAnoCorrente(ano, anoCorrente)
      };
    };
  }

  public static dataMaiorOuIgual(dataInical: string, nomeCampoDataInicial: string, dataFinal: string, nomeCampoDataFinal: string, mesAno: boolean) {
    return (formGroup: FormGroup) => {
      const dataInicialControl = formGroup.controls[dataInical];
      const dataFinalControl = formGroup.controls[dataFinal];

      if (!dataInicialControl || !dataFinalControl) {
        return null;
      }

      if (!dataFinalControl?.value) {
        return null;
      }

      const dataInicio = mesAno ? Util.corrigirDataParaMesAno(new Date(dataInicialControl.value)) : Util.converterHorasDataParaZero(new Date(dataInicialControl.value));
      const dataFim = mesAno ? Util.corrigirDataParaMesAno(new Date(dataFinalControl.value)) : Util.converterHorasDataParaZero(new Date(dataFinalControl.value));

      if (dataInicio > dataFim) {
        dataFinalControl.setErrors({ dataMenor: `${nomeCampoDataFinal} deve ser maior ou igual a ${nomeCampoDataInicial}` });
        dataFinalControl.markAsTouched();
      } else {
        dataFinalControl.setErrors(null);
      }
    }
  }

  public static periodoApuracaoMaiorOuIgual(dataInical: string, nomeCampoDataInicial: string, dataFinal: string, nomeCampoDataFinal: string) {
    return (formGroup: FormGroup) => {
      const dataInicialControl = formGroup.controls[dataInical];
      const dataFinalControl = formGroup.controls[dataFinal];

      if (!dataInicialControl || !dataFinalControl) {
        return null;
      }

      if (!dataFinalControl?.value || dataInicialControl?.invalid || dataFinalControl?.invalid) {
        return null;
      }

      const dataInicio = Util.converterHorasDataParaZero(new Date(dataInicialControl?.value?.periodoApuracao));
      const dataFim = Util.converterHorasDataParaZero(new Date(dataFinalControl?.value?.periodoApuracao));

      if (dataInicio > dataFim) {
        dataFinalControl.setErrors({ dataMenor: `${nomeCampoDataFinal} deve ser maior ou igual ao ${nomeCampoDataInicial}` });
        dataFinalControl.markAsTouched();
      } else {
        dataFinalControl.setErrors(null);
      }
    }
  }

  public static obrigatorioSeCampoEhPreenchido(campoAhValidar: string, nomeCampoAhValidar: string, campoAhComparar: string) {
    return (formGroup: FormGroup) => {
      const controlAhValidar = formGroup.controls[campoAhValidar];
      const controlParametro = formGroup.controls[campoAhComparar];
      const mensagemCampoObrigatorio = RS_MENS_003;

      if (!controlAhValidar.value && controlParametro.value) {
        controlAhValidar.setErrors({
          campoObrigatorio: mensagemCampoObrigatorio(nomeCampoAhValidar)
        }
        );
      } else {
        controlAhValidar.setErrors(null);
      }
      controlAhValidar.markAllAsTouched();
    };
  }
}
