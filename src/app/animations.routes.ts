// import {environment} from '../environments/environment';

// const baseUrl = environment.backendUrl;

export const animationsRoutes = {
  putAnimation: (url: string, animation: string) => `${url}/${animation}`,
  // putAnimation: (animation: string) => `${baseUrl}/${animation}`,
};
