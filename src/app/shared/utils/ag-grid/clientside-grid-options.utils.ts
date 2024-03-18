export const clientSideGridOptions = {
  domLayout: 'autoHeight',
  headerHeight: 35,
  rowHeight: 35,
  suppressColumnVirtualisation: true,
  suppressRowHoverHighlight: true,
  suppressCellSelection: false,
  enableRangeSelection: true,
  paginationPageSize: 10,
  // Opções de seleção de linhas
  rowDeselection: true,
  rowMultiSelectWithClick: true,
  // Opção para que os popups do AG-GRID não se limitem ao espaço da tabela
  popupParent: document.querySelector('body'),
  defaultColDef: {
    flex: 1,
    suppressMovable: true,
    editable: false,
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
  getRowStyle: params => params.node.rowIndex % 2 === 0
    ? { background: '#F3F3F5' }
    : { background: '#fff' },
  // configuração para paginação ServerSide
  rowModelType: 'clientSide',
};
