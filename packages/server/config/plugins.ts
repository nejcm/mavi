import type { Core } from "@strapi/strapi";

const config = ({ env: _ }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});

export default config;
