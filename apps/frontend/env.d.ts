declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_SANITY_STUDIO_URL: string;
    SANITY_API_READ_TOKEN: string;

    ESOR_API_KEY: string;
  }
}

export {};
