import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {AppRoutingModule} from "./app/app.routes";
import {provideHttpClient} from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    ...AppRoutingModule.providers,
    provideHttpClient(),
  ]
}).catch(err => console.log(err));
