export function jobRegistration() {
  const promise = import('@module/pages/jobs').then((m) => m.JobsModule);
  return promise;
}

export function departamentRegistration() {
  const promise = import('@module/pages/departaments').then(
    (m) => m.DepartamentsModule
  );
  return promise;
}

export function employeeRegistration() {
  const promise = import('@module/pages/employees').then(
    (m) => m.EmployeesModule
  );
  return promise;
}

export function manufacturerRegistration() {
  const promise = import('@module/pages/manufacturers').then(
    (m) => m.ManufacturersModule
  );
  return promise;
}

export function noteTypeRegistration() {
  const promise = import('@module/pages/note-types').then(
    (m) => m.NoteTypesModule
  );
  return promise;
}

export function productRegistration() {
  const promise = import('@module/pages/products').then(
    (m) => m.ProductsModule
  );
  return promise;
}

export function supplierRegistration() {
  const promise = import('@module/pages/suppliers').then(
    (m) => m.SuppliersModule
  );
  return promise;
}

export function employeeQueryRegistration() {
  const promise = import('@module/pages/employee-query').then(
    (m) => m.EmployeeQueryModule
  );
  return promise;
}

export function productQueryRegistration() {
  const promise = import('@module/pages/products-query').then(
    (m) => m.ProductsQueryModule
  );
  return promise;
}

export function inventoryRegistration() {
  const promise = import('@module/pages/inventory').then(
    (m) => m.InventoryModule
  );
  return promise;
}

export function licenseRegistration() {
  const promise = import('@module/pages/license').then((m) => m.LicenseModule);
  return promise;
}

export function informationRegistration() {
  const promise = import('@module/pages/information').then(
    (m) => m.InformationModule
  );
  return promise;
}

export function purchaseControlRegistration() {
  const promise = import('@module/pages/purchase-control').then(
    (m) => m.PurchaseControlModule
  );
  return promise;
}
