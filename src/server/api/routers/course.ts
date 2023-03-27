import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const courseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany();
  }),

  search: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.course.findMany({
        where: {
          name: {
            contains: input.name,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        schoolId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.course.create({
        data: {
          name: input.name,
          schoolId: input.schoolId,
        },
      });
    }),
});
