export class ChaveDescricaoDTO {
  chave: any;
  descricao: string = '';
  constructor(param?: any) {
    if (param) {
      this.chave = param.chave;
      this.descricao = param.descricao;
    }
  }
}
