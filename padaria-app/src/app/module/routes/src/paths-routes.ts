import { AppRoutes } from './app-routes-interface';

const REGISTRATION_PATH = 'Cadastro';
const QUERY_PATH = 'Consulta';
const INVENTORY_PATH = 'Estoque';
const PURCHASE_PATH = 'Compras';
const SALES_PATH = 'Vendas';
const ABOUT_PATH = 'Informações';
const COPYRIGHT_PATH = 'Licenças';

export const REGISTRATION_ROUTES_PATHS: AppRoutes[] = [
  {
    path: '/menu/registrations/departaments',
    onlyPath: 'departaments',
    pageTitle: 'Departamento',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/registrations/jobs',
    pageTitle: 'Cargo',
    onlyPath: 'jobs',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/registrations/products',
    pageTitle: 'Produto',
    onlyPath: 'products',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/registrations/employees',
    onlyPath: 'employee',
    pageTitle: 'Funcionário',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/registrations/suppliers',
    onlyPath: 'suppliers',
    pageTitle: 'Fornecedor',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/registrations/manufacturers',
    onlyPath: 'manufacturers',
    pageTitle: 'Fabricante',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/registrations/note-types',
    onlyPath: 'note-type',
    pageTitle: 'Tipos de Nota',
    fatherTitle: REGISTRATION_PATH,
  },
  {
    path: '/menu/registrations/users',
    onlyPath: 'user',
    pageTitle: 'Usuário',
    fatherTitle: REGISTRATION_PATH,
  },
];

export const QUERY_ROUTES_PATHS: AppRoutes[] = [
  {
    path: '/menu/queries/employee-query',
    onlyPath: 'employee-query',
    pageTitle: 'Consulta Funcionário',
    fatherTitle: QUERY_PATH,
  },
  {
    path: '/menu/queries/products-query',
    onlyPath: 'products-query',
    pageTitle: 'Consulta Produtos',
    fatherTitle: QUERY_PATH,
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
    path: '/menu/purchase-control',
    onlyPath: 'purchase-control',
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

export const INFORMATION_PATH: AppRoutes = {
  path: '/menu/information',
  onlyPath: 'information',
  pageTitle: 'Sobre',
  fatherTitle: ABOUT_PATH,
};

export const LICENSE_PATH: AppRoutes = {
  path: '/menu/license',
  onlyPath: 'license',
  pageTitle: 'Licença',
  fatherTitle: COPYRIGHT_PATH,
};

export const ERROR_404_PATH: AppRoutes = {
  path: '/menu/home',
  onlyPath: '**',
  pageTitle: 'Error 404',
  fatherTitle: '',
};

export const LOGIN_PATH: AppRoutes = {
  path: '/login',
  onlyPath: 'login',
  pageTitle: 'Login',
  fatherTitle: '',
};
