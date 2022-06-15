import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../dataSpaceUI/dataSpaceUI.module').then(m => m.DataSpaceUIModule)
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
