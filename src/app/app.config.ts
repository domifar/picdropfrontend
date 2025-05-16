import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
  AutoRefreshTokenService, createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken
} from 'keycloak-angular';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /.*/
})

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(), provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
          enabled: !isDevMode(),
          registrationStrategy: 'registerWhenStable:30000'
        }),
    provideServiceWorker('ngsw-worker.js', {
          enabled: !isDevMode(),
          registrationStrategy: 'registerWhenStable:30000'
        }),
    provideKeycloak({
      config:{
        url:'http://localhost:8080/',
        realm:'htl',
        clientId: 'public'
      },
      initOptions: {
        onLoad: 'check-sso',
      },
      features:[
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 60000
        })
      ],
      providers:[AutoRefreshTokenService, UserActivityService]
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition]
    },
  ]
};
