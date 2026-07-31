import type { NextConfig } from "next";
import path from "path";

const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = (process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  "",
);

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
        ...(basePath ? { basePath } : {}),
      }
    : {}),
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  transpilePackages: ["storybook"],
};

export default nextConfig;
