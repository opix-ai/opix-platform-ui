import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataSpaceUIModule} from "../dataSpaceUI/app/dataSpaceUI.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ReusableComponentsModule} from "../dataSpaceUI/app/shared/reusablecomponents/reusable-components.module";
import {PaFormComponent} from "./pages/patentAnalytics/inputForm/pa-form.component";
import {InputService} from "./services/input.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {SearchWorkflowJobComponent} from "./pages/search-job/search-workflow-job.component";

@NgModule({
  declarations: [
    AppComponent,
    PaFormComponent,
    SearchWorkflowJobComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataSpaceUIModule,
    ReusableComponentsModule,
    AppRoutingModule,
    NgSelectModule
  ],
  providers: [InputService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
