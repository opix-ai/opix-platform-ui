import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchWorkflowJobComponent} from "./pages/search-job/search-workflow-job.component";
import {PayloadExtendComponent} from "./pages/payloadExtentionComponent/payload-extend.component";
import {ResultComponent} from "./pages/result/result.component";
import {HomeDashboardOpixComponent} from "./pages/home-dashboard/home-dashboard-opix.component";
import {LoginGuardComponent} from "../dataSpaceUI/app/services/login-guard.component";
import {RoleAuthGuardComponent} from "../dataSpaceUI/app/services/role-auth-guard.component";
import {PaFormComponent} from "./pages/inputForms/patentAnalytics/pa-form.component";
import {BibliometricsFormComponent} from "./pages/inputForms/bibliometrics/bibliometrics-form.component";
import {PatentFormComponent} from "./pages/inputForms/patent/patent-form.component";
import {HomeOpixComponent} from "./pages/home-opix/home-opix.component";

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
    path: 'patent',
    component: PatentFormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR-WORKFLOW_PROCESSOR"]
    }
  },
  {
    path: 'patentAnalytics',
    component: PaFormComponent,
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
