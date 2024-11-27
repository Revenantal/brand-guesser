import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    OPENAI_API_KEY: '',
    OPENAI_ORGANIZATION_KEY: "",
    OPENAI_PROJECT_KEY: "",
  }
};

export default nextConfig;
