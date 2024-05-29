import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableInfiniteScrollComponent } from './table-infinite-scroll/table-infinite-scroll.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TableInfiniteScrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    InfiniteScrollModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) // Use provideHttpClient with withInterceptorsFromDi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
