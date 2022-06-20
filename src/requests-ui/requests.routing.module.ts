import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RequestComponent} from "./requests/request/request.component";
import {CreateRequestComponent} from "./requests/create/create.request.component";
import {ViewAllRequestsComponent} from "./requests/viewAll/viewAllRequests.component";
import {RoleAuthGuardComponent} from "../dataSpaceUI/services/role-auth-guard.component";

const routes: Routes = [
  {
    path: 'create',
    component: CreateRequestComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER"]
    }
  },
  {
    path: 'all',
    component: ViewAllRequestsComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER", "OPERATOR_DATASET-INGESTOR"]
    }
  },
  {
    path: ':id',
    component: RequestComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER"]
    }
  },
  {
    path: ':id/edit',
    component: CreateRequestComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER"]
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RequestsRoutingModule {}
