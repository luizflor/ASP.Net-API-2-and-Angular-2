import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';


import { AppComponent } from './app.component';
import { ValueComponent } from './values/values.component';

import { HeroListComponent } from './heroes/heroList.component';
import { HeroListComponentPromise } from './heroes/heroList.component.promise';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    ValueComponent,
    HeroListComponent,
    HeroListComponentPromise
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
