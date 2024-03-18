import { Util } from "../util";

export const formatarDataUltimaAtualizacao = params => params.value
  ? (Util.formatarData(params.value, 'dd/MM/yyyy HH:mm')
    + ' por '
    + params.data.nomeUsuario)
  : '';