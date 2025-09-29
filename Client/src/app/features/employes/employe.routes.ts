export const employeRoutes = [
  {
    path: 'manage',
    loadComponent: () =>
      import('./manage/manage-employes.component').then((r) => r.ManageEmployesPage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./create/employe-create.component').then((r) => r.CreateEmployePage),
  },
];
