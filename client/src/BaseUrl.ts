const isProduction = import.meta.env.PROD;

export const finalBaseUrl = isProduction ? "https://windmill-farm-server.fly.dev" : "http://localhost:5003";