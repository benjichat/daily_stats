import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { metricsRouter } from "@/server/api/routers/metrics";
import { statsRouter } from "@/server/api/routers/stats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  metrics: metricsRouter,
  stats: statsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
