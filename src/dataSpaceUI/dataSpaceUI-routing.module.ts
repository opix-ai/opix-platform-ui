import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";

import {IntelcompSearchComponent} from "./pages/search/intelcomp-search.component";
import {DatasetLandingPageComponent} from "./pages/landingpages/datasets/dataset-landing-page.component";
import {RequestDataComponent} from "./pages/requestdata/request-data.component";
import {FormComponent} from "./pages/form/form.component";
import {BrowseJobsComponent} from "./pages/browse-jobs/browse-jobs.component";
import {RoleAuthGuardComponent} from "./services/role-auth-guard.component";

const dataSpaceRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: IntelcompSearchComponent
  },
  {
    path: 'dataset/:id',
    component: DatasetLandingPageComponent
  },
  {
    path: 'request-data',
    component: RequestDataComponent
  },
  {
    path: 'browseJobs',
    component: BrowseJobsComponent
  },
  {
    path: 'form/:datasetTypeId',
    component: FormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-INGESTOR"]
    }
    // loadChildren: () => import('../pages/pages/dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(dataSpaceRoutes)],
  exports: [RouterModule]
})

export class DataSpaceUIRoutingModule { }
