import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchWorkflowJobComponent} from "./pages/search-job/search-workflow-job.component";
import {PayloadExtendComponent} from "./pages/payloadExtentionComponent/payload-extend.component";
import {ResultComponent} from "./pages/result/result.component";
import {HomeDashboardOpixComponent} from "./pages/home-dashboard/home-dashboard-opix.component";
import {LoginGuardComponent} from "../dataSpaceUI/app/services/login-guard.component";
import {RoleAuthGuardComponent} from "../dataSpaceUI/app/services/role-auth-guard.component";
import {BibliometricsFormComponent} from "./pages/workflows/bibliometrics/bibliometrics-form.component";
import {PatentAnalyticsNamesComponent} from "./pages/workflows/patentAnalytics/forms/patent-analytics-names/patent-analytics-names.component";
import {HomeOpixComponent} from "./pages/home-opix/home-opix.component";
import {PatentAnalyticsClassificationsComponent} from "./pages/workflows/patentAnalytics/forms/patent-analytics-classifications/patent-analytics-classifications.component";
import {GlossaryComponent} from "./pages/glossary/glossary.component";
import {
  PatentAnalyticsLandingComponent
} from "./pages/workflows/patentAnalytics/landing/patent-analytics-landing.component";
import {UploadDatasetFormComponent} from "./pages/datasets/upload-dataset/upload-dataset-form.component";
import {MyDatasetsComponent} from "./pages/datasets/my-datasets/my-datasets.component";
import {BibliometricsLandingComponent} from "./pages/workflows/bibliometrics/landing/bibliometrics-landing.component";
import {PatentsResultComponent} from "./pages/result/patents-result.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeOpixComponent
  },
  {
    path: 'glossary',
    component: GlossaryComponent
  },
  {
    path: 'workflowSearch',
    component: SearchWorkflowJobComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'landing/patent-analytics',
    component: PatentAnalyticsLandingComponent,
  },
  {
    path: 'landing/bibliometric-analysis',
    component: BibliometricsLandingComponent,
  },
  {
    path: 'patent-analytics-names',
    component: PatentAnalyticsNamesComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'patent-analytics-classifications',
    component: PatentAnalyticsClassificationsComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'bibliometricAnalysis',
    component: BibliometricsFormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'datasets/upload',
    component: UploadDatasetFormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'datasets/edit/:id',
    component: UploadDatasetFormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'datasets/my',
    component: MyDatasetsComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'landingPage/:resourceType/:identifierValue',
    component: PayloadExtendComponent
  },
  {
    path: 'dashboard',
    component: HomeDashboardOpixComponent,
    canActivate: [LoginGuardComponent]
  },
  {
    path: 'result/:id',
    component: ResultComponent
  },
  {
    path: 'patents-result/:id',
    component: PatentsResultComponent
  },
  {
    path: '',
    loadChildren: () => import('../dataSpaceUI/app/dataSpaceUI.module').then(m => m.DataSpaceUIModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('../requests-ui/requests.module').then(m => m.RequestsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
