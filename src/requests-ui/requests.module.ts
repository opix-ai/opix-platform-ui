import {NgModule} from "@angular/core";
import {RequestComponent} from "./requests/request/request.component";
import {RequestsRoutingModule} from "./requests.routing.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CreateRequestComponent} from "./requests/create/create.request.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ViewAllRequestsComponent} from "./requests/viewAll/viewAllRequests.component";


@NgModule({
  declarations: [
    RequestComponent,
    CreateRequestComponent,
    ViewAllRequestsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RequestsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})

export class RequestsModule {}
