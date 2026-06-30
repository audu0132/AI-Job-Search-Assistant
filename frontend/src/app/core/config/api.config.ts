import { ApplicationConfig } from '@angular/core';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { authInterceptor } from '../interceptors/auth.interceptor';

// Angular application bootstrap config
export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )

  ]

};

// API settings config
export const apiConfig = {
  apiBaseUrl: 'http://localhost:8000/api',
};