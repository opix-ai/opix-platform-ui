import {NgModule} from '@angular/core';
import {DataSpaceUIRoutingModule} from './dataSpaceUI-routing.module';
import {HomeComponent} from "./pages/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CatalogueUiModule} from "../catalogue-ui/catalogue-ui.module";
import {IntelcompSearchComponent} from "./pages/search/intelcomp-search.component";
import {DatasetLandingPageComponent} from "./pages/landingpages/datasets/dataset-landing-page.component";
import {IntelcompFooterComponent} from "./shared/footer/footer.component";
import {RequestDataComponent} from "./pages/requestdata/request-data.component";
import {NavigationService} from "./services/navigation.service";
import {CatalogueService} from "./services/catalogue.service";
import {FormComponent} from "./pages/form/form.component";
import {DynamicFormModule} from "../catalogue-ui/pages/dynamic-form/dynamic-form.module";
import {BrowseJobsComponent} from "./pages/browse-jobs/browse-jobs.component";
import {ReusableComponentsModule} from "./shared/reusablecomponents/reusable-components.module";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {CommonModule} from "@angular/common";
import {RoleAuthGuardComponent} from "./services/role-auth-guard.component";
import {PayloadComponent} from "./pages/landingpages/payload/payload.component";
import {ResourceSearchComponent} from "./pages/search/resource-search/resource-search.component";

@NgModule({
  declarations: [
    HomeComponent,
    IntelcompFooterComponent,
    IntelcompSearchComponent,
    DatasetLandingPageComponent,
    RequestDataComponent,
    FormComponent,
    BrowseJobsComponent,
    PayloadComponent,
    ResourceSearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReusableComponentsModule,
    CatalogueUiModule,
    DynamicFormModule,
    NgSelectModule,
    DataSpaceUIRoutingModule
  ],
  providers: [
    CatalogueService,
    NavigationService,
    AuthenticationService,
    UserService,
    RoleAuthGuardComponent
  ],
  exports: [
    IntelcompFooterComponent
  ]
})

export class DataSpaceUIModule { }
