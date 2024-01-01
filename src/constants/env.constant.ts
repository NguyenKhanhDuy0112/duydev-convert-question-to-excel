export const env = {
    ENV: process.env.REACT_APP_ENV as "production" | "staging" | "development",
    API_BO_ENDPOINT: process.env.REACT_APP_API_BO_ENDPOINT as string,
}
