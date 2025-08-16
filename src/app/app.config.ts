import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppInitializerService } from './services/app-initializer.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (initializer: AppInitializerService) => {
        return () => {
          console.log('Running app initializer...');
          return initializer.initialize();
        };
      },
      deps: [AppInitializerService],
      multi: true
    }
  ]
};
