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
      iconCss: 'icon-microchip icon',
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
      nodeId: '02',
      nodeText: 'Consultas',
      iconCss: 'icon-thumbs-up-alt icon',
      nodeChild: [
        {
          nodeId: '09',
          nodeText: 'Funcionário',
        },
        {
          nodeId: '10',
          nodeText: 'Produto',
        },
      ],
    },
    {
      nodeId: '03',
      nodeText: 'Estoque',
      iconCss: 'icon-docs icon',
    },
    {
      nodeId: '04',
      nodeText: 'Configuração',
      iconCss: 'icon-th icon',
    },
  ];
}
