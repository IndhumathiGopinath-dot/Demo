import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

/**
 * Global configuration for the Angular app.
 *
 * - provideRouter: enables navigation between pages
 * - provideHttpClient: gives our services the ability to make HTTP requests
 *   (this is what lets us TALK to the Spring Boot API)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
