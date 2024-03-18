import { GridOptions } from 'ag-grid-community';
import { Util } from '../util';

function sizeColumns(e: any) {
  if (e.columnApi.getAllColumns()?.length <= 5) {
    e.api.sizeColumnsToFit();
  }
}

export const agGridOptions: GridOptions = {
  blockLoadDebounceMillis: 500,
  domLayout: 'autoHeight',
  pagination: true,
  headerHeight: 35,
  rowHeight: 35,
  onFirstDataRendered: sizeColumns,
  onViewportChanged: sizeColumns,
  //getRowHeight: (params) => Util.rowHeight(params),
  suppressRowHoverHighlight: true,
  // suppressCellSelection: false,
  enableRangeSelection: true,
  // Opções de seleção de linhas
  //rowDeselection: true,
  rowMultiSelectWithClick: true,
  // Opção para que os popups do AG-GRID não se limitem ao espaço da tabela
  popupParent: document.querySelector('body'),
  defaultColDef: {
    suppressMovable: true,
    menuTabs: ['columnsMenuTab'],
    resizable: true,
  },
  animateRows: true,
  localeText: {
    page: 'Página',
    of: 'de',
    to: 'até',
    more: 'mais',
    loadingOoo: 'Carregando...',
    noRowsToShow: 'Nenhum registro encontrado.',
    // opcoes (context menu) - botao direito na tabela
    copy: 'Copiar',
    copyWithHeaders: 'Copiar com cabeçalho',
    paste: 'Colar',
    export: 'Exportar',
    csvExport: 'Exportar em CSV',
    excelExport: 'Exportar em Excel (.xlsx)',
    excelXmlExport: 'Exportar em Excel (.xml)',
    // opcoes context menu de colunas
    searchOoo: 'Filtrar colunas...',
    pinColumn: 'Fixar coluna',
    pinLeft: 'Fixar coluna à esquerda',
    pinRight: 'Fixar coluna à direita',
    noPin: 'Desafixar',
    autosizeThiscolumn: 'Redimensionar essa coluna',
    autosizeAllColumns: 'Redimensionar todas as colunas',
    resetColumns: 'Resetar Colunas',
  },
  // Estilização tipo STRIPED nas linhas da tabela
  getRowStyle: (params) => {
    if (params?.node?.rowIndex != null) {
      return params.node.rowIndex % 2 === 0
        ? { background: '#F3F3F5' }
        : { background: '#fff' };
    }
    // Handle the case when params.node.rowIndex is null or undefined
    return { background: '#fff' }; // or any other default style
  },
  // configuração para paginação ServerSide
  rowModelType: 'serverSide',
  cacheBlockSize: 10,
  paginationPageSize: 10,
  suppressColumnVirtualisation: true,
};
