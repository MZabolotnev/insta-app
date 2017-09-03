import { BrowserModule } from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { UserService }              from './services/user.service';

import { AppComponent } from './app.component';
import { AppRoutingModule }         from './routing/routing.module'
import { AuthorizationModule } from './pages/authorization/authorization.module';
import { MediaModule } from './pages/media/media.module';
import { MediaDetailsModule } from './pages/media-details/media-details.module';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AuthorizationModule,
    MediaModule,
    MediaDetailsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
