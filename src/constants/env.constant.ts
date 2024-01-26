export const env = {
    ENV: process.env.REACT_APP_ENV as "production" | "staging" | "development",
    API_BO_ENDPOINT: process.env.REACT_APP_API_BO_ENDPOINT as string,
    FO_URL: process.env.REACT_APP_FO_URL as string,
    FO_X_API_KEY: process.env.REACT_APP_FO_X_API_KEY as string,
}
