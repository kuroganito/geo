import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2MapModule} from 'ng2-map';
import {DataService} from './servicios/data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2MapModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
