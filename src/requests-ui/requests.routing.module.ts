import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RequestComponent} from "./requests/request/request.component";
import {CreateRequestComponent} from "./requests/create/create.request.component";
import {ViewAllRequestsComponent} from "./requests/viewAll/viewAllRequests.component";

const routes: Routes = [
  {
    path: 'create',
    component: CreateRequestComponent
  },
  {
    path: 'all',
    component: ViewAllRequestsComponent
  },
  {
    path: ':id',
    component: RequestComponent
  },
  {
    path: ':id/edit',
    component: CreateRequestComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RequestsRoutingModule {}
