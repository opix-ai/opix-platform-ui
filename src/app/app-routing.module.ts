import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchWorkflowJobComponent} from "./pages/search-job/search-workflow-job.component";
import {PayloadExtendComponent} from "./pages/payloadExtentionComponent/payload-extend.component";
import {ResultComponent} from "./pages/result/result.component";
import {HomeDashboardOpixComponent} from "./pages/home-dashboard/home-dashboard-opix.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'workflowSearch',
    component: SearchWorkflowJobComponent
  },
  {
    path: 'landingPage/:resourceType/:identifierValue',
    component: PayloadExtendComponent
  },
  {
    path: 'dashboard',
    component: HomeDashboardOpixComponent
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
