import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitanicComponent } from './titanic/titanic.component';
import {TitanicGridComponent} from './titanic/titanic-grid/titanic-grid.component';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { TitanicChartsComponent } from './titanic/titanic-charts/titanic-charts.component';
import { TitanicBarChartsComponent } from './titanic/titanic-bar-charts/titanic-bar-charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {TitanicService} from './services/titanic.service';
@NgModule({
  declarations: [
    AppComponent,
    TitanicComponent,
    TitanicGridComponent,
    jqxGridComponent,
    TitanicChartsComponent,
    TitanicBarChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [TitanicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
