import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const metricsRouter = createTRPCRouter({
  getAll: protectedProcedure
  .query(({ ctx }) => {
    // help me fix the metric error here
    return ctx.prisma.metric.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
  .input(z.object({ name: z.string() }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.metric.create({
      data: {
        name: input.name,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }
  ),

});
