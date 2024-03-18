import { WrapperComponent } from "../../pages/wrapper/wrapper.component";

export const ROTAS_PRODUTOS = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../produtos/produtos.module')
          .then((m) => m.ProdutosModule),
        data: {
          tituloPainel: 'Consultar Produtos',
          widthPainel: 100,
        },
      },
    ],
  },
];
