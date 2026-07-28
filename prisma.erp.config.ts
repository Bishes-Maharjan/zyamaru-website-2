import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: "prisma/erp.schema.prisma",   // ← must match the actual filename
    datasource: {
        url: env("ERP_DIRECT_URL"),
    },
});