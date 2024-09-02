import { FullConfig } from "@playwright/test";
import { verifyBaseEnv } from "./load_env";

export default async function globalSetup(config: FullConfig) {
  verifyBaseEnv()  
}