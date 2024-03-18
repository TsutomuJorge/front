import {
  ColDef,
  ValueGetterParams,
  ValueSetterParams,
} from 'ag-grid-community';
import { DialogGridComponent } from './components/dialog-grid/dialog-grid.component';
import formatCurrency from 'src/app/shared/utils/number-to-currency';
import { CalculosMatematicos } from 'src/app/shared/utils/calculos-matematicos';

export const colDefs: ColDef[] = [
  {
    field: 'descricaoProduto',
    filter: 'agTextColumnFilter',
    suppressHeaderMenuButton: true,
  },
  { field: 'nomeFabricante' },
  {
    field: 'quantidade',
    cellEditor: 'agNumberCellEditor',
    editable: true,
    valueGetter: (params: ValueGetterParams) => params.data.quantidade,
    valueSetter: (params: ValueSetterParams) => {
      params.data.quantidade = params.newValue;
      return params.newValue;
    },
  },
  {
    editable: true,
    field: 'valorUnitario',
    valueGetter: (params) => {
      if (params?.data?.valorUnitario) {
        const valor = (params?.data?.valorUnitario)
          .toString()
          .replace(',', '.');
        return formatCurrency(valor, true);
      }
      return '';
    },
    valueSetter: (params: ValueSetterParams) => {
      if (params.newValue) {
        const value = params.newValue.toString().replace(',', '.');
        params.data.valorUnitario = value;
        return value;
      }
      return params.newValue;
    },
  },
  {
    field: 'valorTotal',
    valueGetter: (params) => formatCurrency(params?.data?.valorTotal, true),
  },
  {
    field: 'valorMinimo',
    valueGetter: (params) => {
      const valor = CalculosMatematicos.multiplicar(
        params?.data?.custoUnitario,
        1.3
      );
      params.data.valorMinimo = valor;
      return formatCurrency(valor, true);
    },
  },
  {
    field: 'valorTotalMinimo',
    valueGetter: (params) =>
      formatCurrency(params?.data?.valorTotalMinimo, true),
  },
  {
    field: 'custoUnitario',
    valueGetter: (params) => formatCurrency(params?.data?.custoUnitario, true),
  },
  {
    field: 'custoTotal',
    valueGetter: (params) => formatCurrency(params?.data?.custoTotal, true),
  },
  {
    headerName: 'LC Min',
    field: 'lcMin',
    valueGetter: (params) => formatCurrency(params.data?.lcMin, true),
  },
  {
    headerName: 'LC Max',
    field: 'lcMAx',
    valueGetter: (params) => formatCurrency(params.data?.lcMAx, true),
  },
  {
    headerName: 'Ação',
    field: 'Ação',
    cellRenderer: DialogGridComponent,
    pinned: 'right',
    filter: false,
  },
  { headerName: 'Row ID', valueGetter: 'node.id', hide: true },
];
