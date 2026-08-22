import 'dotenv/config';

export const config = {
    version: process.env.APP_VERSION || 'local',
    port: parseInt(process.env.PORT || '4060', 10),
    corsAllowedOrigin: process.env.CORS_ALLOWED_ORIGIN || '',
    sioAllowedOrigin: process.env.SIO_ALLOWED_ORIGIN || '',
    debugSocket: !!(process.env.DEBUG_SOCKET),
};
