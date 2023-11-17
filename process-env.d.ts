declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      PASS_SEC: string;
      JWT_SECRET: string;
      // add more environment variables and their types here
    }
  }
}
export {};