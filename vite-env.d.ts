/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface ImportMetaEnvironment {
  readonly VITE_CTP_AUTH_HOST: string;
  readonly VITE_CTP_HOST: string;
  readonly VITE_CTP_PROJECT_KEY: string;
  readonly VITE_CTP_CLIENT_ID: string;
  readonly VITE_CTP_CLIENT_SECRET: string;
  readonly VITE_CTP_SCOPES: string;
}

/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface ImportMeta {
  readonly env: ImportMetaEnvironment;
}
