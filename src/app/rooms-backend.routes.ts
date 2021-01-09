import {environment} from '../environments/environment';

const baseUrl = environment.backendUrl;

export const roomsBackendRoutes = {
  getRoom: (token: string) => `${baseUrl}/rooms/room/${token}`,
};
