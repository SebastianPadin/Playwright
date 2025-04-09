import { Routes } from '@angular/router';

export const routes: Routes = [
  // Dashboard General
  {
    path: 'Dashboard',
    title: 'Dashboard General',
    loadComponent: () =>
      import('./components/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },

  // Módulo Galpón
  {
    path: 'Modulo-Galpon',
    loadComponent: () =>
      import('./components/components.component').then(
        (m) => m.ComponentsComponent
      ),
    children: [
      {
        path: 'Masters',
        title: 'Maestros Galpón',
        loadComponent: () =>
          import(
            './components/pages/masters/food/food.component'
          ).then((m) => m.FoodComponent),
      },
      {
        path: 'Alimento',
        title: 'Maestros Food',
        loadComponent: () =>
          import(
            './components/pages/masters/food/food.component'
          ).then((m) => m.FoodComponent),
      },
      {
        path: 'Proveedor',
        title: 'Maestros Proveedor',
        loadComponent: () =>
          import(
            './components/pages/masters/proveedor/proveedor.component'
          ).then((m) => m.ProveedorComponent),
      },
      {
        path: 'Ubicaciones',
        title: 'Ubicaciones',
        loadComponent: () =>
          import('./components/pages/masters/location/location.component').then(
            (m) => m.LocationComponent
          ),
      },
      {
        path: 'Tipo-Proveedores',
        title: 'Tipo de Proveedores',
        loadComponent: () =>
          import(
            './components/pages/masters/type-supplier/type-supplier.component'
          ).then((m) => m.TypeSupplierComponent),
      },
      {
        path: 'Galpon',
        title: 'Galpón',
        loadComponent: () =>
          import('./components/pages/masters/shed/shed.component').then(
            (m) => m.ShedComponent
          ),
      },
      {
        path: 'Productos',
        title: 'Productos',
        loadComponent: () =>
          import('./components/pages/masters/product/product.component').then(
            (m) => m.ProductComponent
          ),
      },
      {
        path: 'Kardex de huevo',
        title: 'Kardex de huevo',
        loadComponent: () =>
          import('./components/pages/Transaccs/kardex-egg/kardex-egg.component').then(
            (m) => m.KardexEggComponent
          ),
      },
      {
        path: 'Costo de alimento',
        title: 'Costo de alimento',
        loadComponent: () =>
          import('./components/pages/Transaccs/costs-food/costs-food.component').then(
            (m) => m.CostsFoodComponent
          ),
      }
    ],
  },

  // Módulo Bienestar Común
  {
    path: 'Modulo-Bienestar-Comun',
    loadComponent: () =>
      import('./components/components.component').then(
        (m) => m.ComponentsComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full',
      },
      {
        path: 'Dashboard',
        title: 'Dashboard Bienestar',
        loadComponent: () =>
          import('./components/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'Masters',
        title: 'Maestros Bienestar',
        loadComponent: () =>
          import('./components/pages/masters/masters.component').then(
            (m) => m.MastersComponent
          ),
      },
    ],
  },

  // Módulo Psicología
  {
    path: 'Modulo-Psicologia',
    title: 'Módulo Psicología',
    loadComponent: () =>
      import('./components/components.component').then(
        (m) => m.ComponentsComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full',
      },
      {
        path: 'Dashboard',
        title: 'Dashboard Psicología',
        loadComponent: () =>
          import('./components/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'Masters',
        title: 'Maestros Psicología',
        loadComponent: () =>
          import(
            './components/pages/masters/food/food.component'
          ).then((m) => m.FoodComponent),
      },
    ],
  },

  {
    path: '',
    redirectTo: 'Modulo-Galpon',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'Modulo-Galpon',
  },
];
