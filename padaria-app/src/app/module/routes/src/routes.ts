import { AppRoutes } from './app-routes-interface';

const REGISTRATION_PATH = 'Cadastro';
const QUERY_PATH = 'Consulta';
const INVENTORY_PATH = 'Estoque';
const PURCHASE_PATH = 'Compras';
const SALES_PATH = 'Vendas';
const DASHBOARDS_PATH = 'DashBoards';


export const REGISTRATION_ROUTES_PATHS: AppRoutes[] = [
  {
    path: '/menu/departaments',
    onlyPath: 'departaments',
    pageTitle: 'Departamento',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/jobs',
    pageTitle: 'Cargo',
    onlyPath: 'jobs',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/products',
    pageTitle: 'Produto',
    onlyPath: 'products',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/employee',
    onlyPath: 'employee',
    pageTitle: 'Funcionário',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/suppliers',
    onlyPath: 'suppliers',
    pageTitle: 'Fornecedor',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/manufacturers',
    onlyPath: 'manufacturers',
    pageTitle: 'Fabricante',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/note-type',
    onlyPath: 'note-type',
    pageTitle: 'Tipos de Nota',
    fatherTitle: REGISTRATION_PATH,
  },
];

export const QUERY_ROUTES_PATHS: AppRoutes[] = [
  {
    path: '/menu/employee-query',
    onlyPath: 'employee-query',
    pageTitle: 'Consulta Funcionário',
    fatherTitle: QUERY_PATH,
  },
  {
    path: '/menu/products-query',
    onlyPath: 'products-query',
    pageTitle: 'Consulta Produtos',
    fatherTitle: QUERY_PATH,
  },
];

export const DASHBOARDS_ROUTES_PATH: AppRoutes[] = [
  {
    path: '/menu/dashboards-receipts',
    onlyPath: 'dashboards-receipts',
    pageTitle: 'Receita',
    fatherTitle: DASHBOARDS_PATH,
  },
  {
    path: '/menu/dashboards-expenses',
    onlyPath: 'dashboards-expenses',
    pageTitle: 'Despesas',
    fatherTitle: DASHBOARDS_PATH,
  },
];

export const OHTERS_ROUTES_PATHS: AppRoutes[] = [
  {
    path: '/menu/inventory',
    onlyPath: 'inventory',
    pageTitle: 'Controle Estoque',
    fatherTitle: INVENTORY_PATH,
  },
  {
    path: '/menu/purchase',
    onlyPath: 'purchase',
    pageTitle: 'Controle Compras',
    fatherTitle: PURCHASE_PATH,
  },
  {
    path: '/menu/sales',
    onlyPath: 'sales',
    pageTitle: 'Controle Vendas',
    fatherTitle: SALES_PATH,
  },
];
