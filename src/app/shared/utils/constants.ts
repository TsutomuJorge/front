import { ITooltipParams } from "ag-grid-community";

//Mensagens de falha
export const MSG_SUCESSO = 'Operação realizada com sucesso.';
export const MSG_FALHA_OPERACAO = 'Ocorreu uma falha na operação.';
export const MSG_USUARIO_NAO_AUTENTICADO = 'O usuário não tem permissão para realizar esta operação.';
export const MSG_FALHA_DOWNLOAD = 'Ocorreu uma falha no download do arquivo.';
/**
 *  RS_MENS_001 - Erro no processamento
 *   Houve o erro <descrição resumida do erro> no processamento da transação. Favor contactar administrador do SAATCalculoEUST.
 */
export const RS_MENS_001 = (descricaoErro?: string) => `Houve ${descricaoErro ? `o erro '${descricaoErro}'` : 'um erro'} no processamento da transação. Favor contactar administrador do SAATCalculoEUST.`;

/**
 *  RS_MENS_002 - Transação realizad com sucesso
 *  <transacao> realizada com sucesso!
 */
export const RS_MENS_002 = (transacao: string) => `${transacao} realizada com sucesso!`;

/**
 *  RS_MENS_003 - Campo Obrigatório
 *  Campo <nome do campo> é obrigatório
 */
export const RS_MENS_003 = (campo: string) => `${campo} é obrigatório`;

/**
 *  RS_MENS_004
 * <nome do campo> inválido
 */
export const RS_MENS_004 = (campo: string) => `${campo} está inválido(a)`;

/**
 *  RS_MENS_005
 * Período de Apuração <MM/AAAA> informado não segue a sequência de períodos de apuração já cadastrados: último cadastrado <MM/AAAA>, Deseja continuar?
 */
export const RS_MENS_005 = (periodo: string, ultimoPeriodo: string) => `Período de Apuração ${periodo} informado não segue a sequência de períodos de apuração já cadastrados: último cadastrado ${ultimoPeriodo}, Deseja continuar?`;

/**
 *  RS_MENS_006
 * <nome do campo> fora do Ciclo Tarifário <periodo do ciclo tarifario>
 */
export const RS_MENS_006 = (campo: string, periodo: string) => `${campo} fora do Ciclo Tarifário ${periodo}`;

/**
 *  RS_MENS_007
 * <nome do campo> deve ser maior que <min> e menor que <max>
 */
export const RS_MENS_007 = (campo: string, min: string, max: string) => `${campo} deve ser maior que ${min} e menor que ${max}`;

/**
 *
 * @param campo nome do campo
 * @param max quantidade de caracteres maximo
 * @returns <nome do campo> excede o limite de <max> caracteres
 */
export const RS_MENS_008 = (campo: string, max: string) => `${campo} excede o limite de ${max} caracteres.`;

/**
 *  RS_MENS_011
 * Data inicial maior que data final
 */
export const RS_MENS_011 = (tipoCampoData: string) => `${tipoCampoData} inicial maior que ${tipoCampoData} final`;

/**
 *  RS_MENS_012
 * Data final menor que data inicial
 */
export const RS_MENS_012 = (tipoCampoData: string) => `${tipoCampoData} final menor que ${tipoCampoData} inicial`;

/**
 *  RS_MENS_014
 * Deseja, realmente, <descrição da ação>?
 */
export const RS_MENS_014 = (acao: string) => `Deseja, realmente, ${acao}?`;

/**
 *  RS_MENS_031
 * Não é mais possível contestar o Encargo Mensal, pois a data limite já foi ultrapassada
 */
export const RS_MENS_031 = `Não é mais possível contestar o Encargo Mensal, pois a data limite já foi ultrapassada.`;

export const RS_MENS_032 = `Selecione, pelo menos, um encargo com o motivo “Suspensão”.`;

export const RS_MENS_033 = `Selecione apenas encargos associados a suspensão de agente da apuração não finalizados.`;

export const RS_MENS_034 = `Selecione apenas encargos com o motivo “Suspensão”.`;

export const RS_MENS_035 = (periodo: string) => `A suspensão do agente da apuração deve possuir vigência final menor que o período de apuração aberto: ${periodo}`;

export const RS_MENS_036 = `A suspensão do agente da apuração não possui vigência final informada.`;

export const RS_MENS_37 = (vigenciaInicial: string, vigenciaFinal: string) => `Data fora da vigência: ${vigenciaInicial} - ${vigenciaFinal}`;

export const TOOLTIP_VIGENCIAS_ATUALIZAR_TARIFAS = (params: ITooltipParams) => ('A vigência da tarifa se refere ao mês/ano de medição do encargo setorial');

export const NAO_EXISTE_PERIODO_ABERTO = 'Não existe período de apuração aberto.';

// Primeng Language
export const PRIMENG_LANGUAGE = {
  startsWith: 'Starts with',
  contains: 'Contains',
  notContains: 'Not contains',
  endsWith: 'Ends with',
  equals: 'Equals',
  notEquals: 'Not equals',
  noFilter: 'No Filter',
  lt: 'Less than',
  lte: 'Less than or equal to',
  gt: 'Greater than',
  gte: 'Greater than or equal to',
  is: 'Is',
  isNot: 'Is not',
  before: 'Depois',
  after: 'Antes',
  dateIs: 'Date is',
  dateIsNot: 'Date is not',
  dateBefore: 'Date is before',
  dateAfter: 'Date is after',
  clear: 'Limpar',
  apply: 'Aplicar',
  matchAll: 'Match All',
  matchAny: 'Match Any',
  addRule: 'Add Rule',
  removeRule: 'Remove Rule',
  accept: 'Sim',
  reject: 'Não',
  choose: 'Choose',
  upload: 'Upload',
  cancel: 'Cancelar',
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dateFormat: 'mm/dd/yyyy',
  today: 'Hoje',
  weekHeader: 'Sem',
  weak: 'Semana',
  medium: 'Médio',
  strong: 'Strong',
  passwordPrompt: 'Enter a password',
  emptyMessage: 'Nenhum resultado encontrado',
  emptyFilterMessage: 'Nenhum resultado encontrado'
};
