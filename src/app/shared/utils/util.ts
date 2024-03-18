import { formatDate } from "@angular/common";

export class Util {
  /**
  * Retorna URLSearchParams das propiedades preenchidas.
  */
  static getURLSearchParams(obj?: any, separateAtributeList = new Array<string>()): string {
    if (obj) {
      const params = new URLSearchParams();
      Object.keys(obj).forEach(nameAttribute => {
        if (obj[nameAttribute] && Array.isArray(obj[nameAttribute]) && separateAtributeList.some(item => item === nameAttribute)) {
          obj[nameAttribute].forEach((itemAttribute: any) => {
            params.append(nameAttribute, String(itemAttribute));
          });
        } else {
          obj[nameAttribute] && params.append(nameAttribute, String(obj[nameAttribute]));
        }
      });
      return params ? `?${params}` : '';
    }
    return '';
  }

  static getEnumNames = (e: any) => {
    return Object.keys(e).map(k => e[k]).filter(v => typeof v === 'string') as string[];
  };

  static formatarData = (data: string | number | Date, formato: string) => {
    return formatDate(data, formato, 'pt-BR');
  };

  static isEmpty = (arg: any): boolean => {
    return (
      arg === 0 ||
      arg == null ||
      arg.length === 0 ||
      (typeof arg === 'object' && Object.keys(arg).length === 0)
    );
  };

  static adicionarMascaraCNPJ(texto: string): string {
    if (texto) {
      return texto.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, '$1.$2.$3/$4-$5')
    }
    return '';
  }

  public static converterStringParaPrimeiraDiaDoMes(date: string): Date {
    const parts = date.split("/");
    return new Date(`${(Number.parseInt(parts[1]))}/01/${parts[2]}`);
  }

  public static converterStringParaData(date: string): Date | null {
    if (!date) {
      return null;
    }

    const parts = date.split("/");
    return new Date(`${parts[2]}/${(Number.parseInt(parts[1]))}/${parts[0]}`);
  }

  public static converterDateParaString(date: Date, mesAno: boolean): string {
    const dia = this.adicionarZeroHaData(date.getDate());
    const mes = this.adicionarZeroHaData(date.getMonth() + 1);

    return mesAno ? `${mes}/${date.getFullYear()}` : `${dia}/${mes}/${date.getFullYear()}`;
  }

  public static converterStringMesAnoParaData(date: string): Date {
    const parts = date.split("/");
    return new Date(`${(Number.parseInt(parts[0]))}/01/${parts[1]}`);
  }

  public static converterHorasDataParaZero(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public static corrigirDataParaMesAno(date: Date): Date {
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  public static obterDiaMesAnoAtual(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1;
    let mes: string = '';

    if (mm < 10) {
      mes = '0' + mm;
    }

    return yyyy + '/' + mes + '/' + '01';
  }

  public static getAllStatic<T>(tipo: any): T[] {
    const keys = Object.keys(tipo);
    return keys.map(key => tipo[key])
      .filter(value => typeof (value) === 'object');
  }

  public static adicionarZeroHaData(valor: number): string {
    return valor < 10 ? '0' + valor : valor.toString();
  }

  public static ehNumeroPositivo(valor: string): boolean | null {
    if (this.ehNumero(valor)) {
      if (+valor >= 0) {
        return true;
      }
      return false;
    }
    return null;
  }

  public static ehNumero(valor: string): boolean {
    if (+valor || valor == '0') {
      return true;
    }

    return false;
  }

  public static obterValorOriginalAjustadoTooltip(data: any, campo: string): any {
    const valorOriginal = data[campo + 'Original'];
    const valorInicial = data[campo + 'Inicial'];
    const valorInicialEhDiferenteValorAlterado = valorInicial != data[campo];
    const valorOriginalEhDiferenteValorAlterado = valorOriginal != data[campo];

    return valorOriginal && valorOriginalEhDiferenteValorAlterado && valorInicialEhDiferenteValorAlterado ? valorOriginal : ''
  }

  public static obterRegiaoPeloUF(uf?: string): string {
    switch (uf) {
      case "AC":
      case "AP":
      case "AM":
      case "PA":
      case "RO":
      case "RR":
      case "TO":
        return "Norte";
      case "AL":
      case "BA":
      case "CE":
      case "MA":
      case "PB":
      case "PI":
      case "PE":
      case "RN":
      case "SE":
        return "Nordeste"
      case "DF":
      case "GO":
      case "MT":
      case "MS":
        return "Centro-Oeste"
      case "ES":
      case "MG":
      case "RJ":
      case "SP":
        return "Sudeste"
      case "PR":
      case "RS":
      case "SC":
        return "Sul"
      default:
        return ""
    }
  }

}
