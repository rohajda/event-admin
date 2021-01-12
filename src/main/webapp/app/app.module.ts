import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EventAdminSharedModule } from 'app/shared/shared.module';
import { EventAdminCoreModule } from 'app/core/core.module';
import { EventAdminAppRoutingModule } from './app-routing.module';
import { EventAdminHomeModule } from './home/home.module';
import { EventAdminEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EventAdminSharedModule,
    EventAdminCoreModule,
    EventAdminHomeModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EventAdminEntityModule,
    EventAdminAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class EventAdminAppModule {}
