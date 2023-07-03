import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchWorkflowJobComponent} from "./pages/search-job/search-workflow-job.component";
import {PayloadExtendComponent} from "./pages/payloadExtentionComponent/payload-extend.component";
import {ResultComponent} from "./pages/result/result.component";
import {HomeDashboardOpixComponent} from "./pages/home-dashboard/home-dashboard-opix.component";
import {LoginGuardComponent} from "../dataSpaceUI/app/services/login-guard.component";
import {RoleAuthGuardComponent} from "../dataSpaceUI/app/services/role-auth-guard.component";
import {BibliometricsFormComponent} from "./pages/inputForms/bibliometrics/bibliometrics-form.component";
import {PatentAnalyticsNamesComponent} from "./pages/inputForms/patent-analytics-names/patent-analytics-names.component";
import {HomeOpixComponent} from "./pages/home-opix/home-opix.component";
import {PatentAnalyticsClassificationsComponent} from "./pages/inputForms/patent-analytics-classifications/patent-analytics-classifications.component";

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
    path: 'workflowSearch',
    component: SearchWorkflowJobComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
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
