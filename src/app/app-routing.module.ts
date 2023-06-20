import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaFormComponent} from "./pages/patentAnalytics/inputForm/pa-form.component";
import {SearchWorkflowJobComponent} from "./pages/search-job/search-workflow-job.component";
import {BibliometricsFormComponent} from "./pages/bibliometrics/inputForm/bibliometrics-form.component";
import {SuccessPageComponent} from "./pages/successPage/successPage.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'patentsAnalytics',
    component: PaFormComponent
  },
  {
    path: 'bibliometrics',
    component: BibliometricsFormComponent
  },
  {
    path: 'workflowSearch',
    component: SearchWorkflowJobComponent
  },
  {
    path: 'success',
    component: SuccessPageComponent
  },
  {
    path: 'home',
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
