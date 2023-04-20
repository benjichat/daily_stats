import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const statsRouter = createTRPCRouter({

  getAll: protectedProcedure
  .query(({ ctx }) => {
    return ctx.prisma.dailyStat.findMany({
      where: {
        metric: {
          userId: ctx.session.user.id,
        },
      },
      orderBy: {
        date: 'asc', // Optional: Order by date, ascending
      },
    });
  }),

  getDay: protectedProcedure
  .input(z.object({ date: z.date() }))
  .query( async ({ ctx, input }) => {
    const { date } = input;

    // Step 1: Create two new Date objects for the start and end of the input day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Step 2: Update the where clause to fetch records between start and end of the input day
    const result = await ctx.prisma.dailyStat.findMany({
      where: {
        AND: [
          {
            metric: {
              userId: ctx.session.user.id,
            },
          },
          {
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        ],
      },
    });
    console.log(result, "result in server call")
    return result;
  }),


  create: protectedProcedure
  .input(z.object({ date: z.date(), value: z.number(), metricId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.dailyStat.upsert({
      where: {
        date_metricId: {
          date: input.date,
          metricId: input.metricId,
        },
      },
      update: {
        value: input.value,
      },
      create: {
        date: input.date,
        value: input.value,
        metricId: input.metricId,
      },
    });
  }),


});
