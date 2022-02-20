export interface MenuSideBarNode {
  nodeId: string;
  nodeText: string;
  iconCss?: string;
  nodeChild?: MenuSideBarNode[];
}

export class MenuSideBar {
  items: MenuSideBarNode[] = [
    {
      nodeId: '01',
      nodeText: 'Cadastros',
      iconCss: 'e-icons e-description',
      nodeChild: [
        {
          nodeId: '02',
          nodeText: 'Departamento',
        },
        {
          nodeId: '03',
          nodeText: 'Fornecedor',
        },
        {
          nodeId: '04',
          nodeText: 'Funcionário',
        },
        {
          nodeId: '05',
          nodeText: 'Fabricante',
        },
        {
          nodeId: '06',
          nodeText: 'Produto',
        },
        {
          nodeId: '07',
          nodeText: 'Função',
        },
        {
          nodeId: '08',
          nodeText: 'Tipo Nota',
        },
      ],
    },
    {
      nodeId: '09',
      nodeText: 'Consultas',
      iconCss: 'e-icons e-search',
      nodeChild: [
        {
          nodeId: '10',
          nodeText: 'Funcionário',
        },
        {
          nodeId: '11',
          nodeText: 'Produto',
        },
      ],
    },
    {
      nodeId: '12',
      nodeText: 'Estoque',
      iconCss: 'e-icons e-stroke-width',
    },
    {
      nodeId: '13',
      nodeText: 'Compras',
      iconCss: 'e-icons e-chevron-right',
    },
    {
      nodeId: '14',
      nodeText: 'Vendas',
      iconCss: 'e-icons e-chevron-right',
    },
    {
      nodeId: '15',
      nodeText: 'Gráfico',
      iconCss: 'e-icons e-change-chart-type',
    },
  ];
}
