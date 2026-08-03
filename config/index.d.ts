export declare const config: {
    env: string;
    port: number;
    clientUrl: string;
    apiUrl: string;
    mongoUri: string;
    redisUrl: string;
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiry: string;
        refreshExpiry: string;
    };
    email: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
    };
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
    google: {
        clientId: string;
        clientSecret: string;
        mapsApiKey: string;
    };
    twilio: {
        accountSid: string;
        authToken: string;
        phoneNumber: string;
    };
    logLevel: string;
};
