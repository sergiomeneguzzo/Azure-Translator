import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import {TraductorComponent} from './app/pages/traductor/traductor.component';

bootstrapApplication(TraductorComponent, {
  providers: [provideHttpClient()],
});
