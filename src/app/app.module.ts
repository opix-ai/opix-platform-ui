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
import {BibliometricsFormComponent} from "./pages/workflows/bibliometrics/bibliometrics-form.component";
import {SuccessPageComponent} from "./pages/successPage/successPage.component";
import {PayloadExtendComponent} from "./pages/payloadExtentionComponent/payload-extend.component";
import {ResultComponent} from "./pages/result/result.component";
import {HomeDashboardOpixComponent} from "./pages/home-dashboard/home-dashboard-opix.component";
import {PatentAnalyticsNamesComponent} from "./pages/workflows/patentAnalytics/forms/patent-analytics-names/patent-analytics-names.component";
import {HomeOpixComponent} from "./pages/home-opix/home-opix.component";
import {PatentAnalyticsClassificationsComponent} from "./pages/workflows/patentAnalytics/forms/patent-analytics-classifications/patent-analytics-classifications.component";
import {GlossaryComponent} from "./pages/glossary/glossary.component";
import {PatentAnalyticsLandingComponent} from "./pages/workflows/patentAnalytics/landing/patent-analytics-landing.component";
import {UploadDatasetFormComponent} from "./pages/datasets/upload-dataset/upload-dataset-form.component";
import {DndDirective} from "./directives/dnd.directive";
import {MyDatasetsComponent} from "./pages/datasets/my-datasets/my-datasets.component";
import {BibliometricsLandingComponent} from "./pages/workflows/bibliometrics/landing/bibliometrics-landing.component";
import {AnalysesFiltersComponent} from "./pages/analyses-filters/analyses-filters.component";
import {PatentsResultComponent} from "./pages/result/patents-result.component";
import {CatalogueUiModule} from "../dataSpaceUI/catalogue-ui/catalogue-ui.module";
import {CatalogueUiSharedModule} from "../dataSpaceUI/catalogue-ui/shared/catalogue-ui-shared.module";

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
    GlossaryComponent,
    ResultComponent,
    PatentsResultComponent,
    PatentAnalyticsLandingComponent,
    BibliometricsLandingComponent,
    AnalysesFiltersComponent,
    UploadDatasetFormComponent,
    MyDatasetsComponent,
    DndDirective
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
    // CatalogueUiModule,
    CatalogueUiSharedModule
  ],
  providers: [InputService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
