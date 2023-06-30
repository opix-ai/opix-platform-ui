import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataSpaceUIModule} from "../dataSpaceUI/app/dataSpaceUI.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ReusableComponentsModule} from "../dataSpaceUI/app/shared/reusablecomponents/reusable-components.module";
import {InputService} from "./services/input.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {SearchWorkflowJobComponent} from "./pages/search-job/search-workflow-job.component";
import {BibliometricsFormComponent} from "./pages/inputForms/bibliometrics/bibliometrics-form.component";
import {SuccessPageComponent} from "./pages/successPage/successPage.component";
import {PayloadExtendComponent} from "./pages/payloadExtentionComponent/payload-extend.component";
import {ResultComponent} from "./pages/result/result.component";
import {SharedModule} from "../dataSpaceUI/catalogue-ui/shared/shared.module";
import {HomeDashboardOpixComponent} from "./pages/home-dashboard/home-dashboard-opix.component";
import {PatentAnalyticsNamesComponent} from "./pages/inputForms/patent-analytics-names/patent-analytics-names.component";
import {HomeOpixComponent} from "./pages/home-opix/home-opix.component";
import {PatentAnalyticsClassificationsComponent} from "./pages/inputForms/patent-analytics-classifications/patent-analytics-classifications.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeOpixComponent,
    PayloadExtendComponent,
    HomeDashboardOpixComponent,
    SuccessPageComponent,
    PatentAnalyticsClassificationsComponent,
    PatentAnalyticsNamesComponent,
    BibliometricsFormComponent,
    SearchWorkflowJobComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataSpaceUIModule,
    ReusableComponentsModule,
    AppRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  providers: [InputService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
