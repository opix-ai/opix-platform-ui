/**
 * Created by stefania on 4/6/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenPageComponent } from './403-forbidden-page.component';
import { ReadMoreComponent, ReadMoreTextComponent } from './read-more.component';
import { SideMenuDashboardComponent } from "../sidemenudashboard/side-menu-dashboard.component";
import { TopMenuLandingComponent } from "../top-menu/topmenulanding/top-menu-landing.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // TabsModule.forRoot(),
    // ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    TopMenuLandingComponent,
    SideMenuDashboardComponent,
    // FooterComponent,
    ForbiddenPageComponent,
    ReadMoreComponent,
    ReadMoreTextComponent,
  ],
  exports: [
    TopMenuLandingComponent,
    SideMenuDashboardComponent,
    // SideMenuComponent,
    // FooterComponent,
    ForbiddenPageComponent,
    ReadMoreComponent,
    ReadMoreTextComponent,
  ],
  providers: [
    // HelpContentService
  ],
})

export class ReusableComponentsModule {
}
