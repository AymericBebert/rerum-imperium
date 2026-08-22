import {InjectionToken} from '@angular/core';

export interface AppConfig {
  version: string;
  backendUrl: string;
  websiteUrl: string;
  debugSocket: boolean;
  debugHttp: boolean;
  tokenLength: number;
}

export function appConfigFactory(): AppConfig {
  const appConstants: AppConfig = (window as any)['APP_CONFIG'] || {};
  return {
    version: appConstants.version || 'untagged',
    backendUrl: appConstants.backendUrl || 'http://localhost:4060',
    websiteUrl: appConstants.websiteUrl || 'http://localhost:4600',
    debugSocket: appConstants.debugSocket || false,
    debugHttp: appConstants.debugHttp || false,
    tokenLength: appConstants.tokenLength || 8,
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export interface EnvironmentConfig {
  production: boolean;
}
