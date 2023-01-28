import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const classRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.class.findMany();
    }),

  search: publicProcedure
    .input(z.object({
      name: z.string(),
    }))
    .query(({input, ctx}) => {
      return ctx.prisma.class.findMany({
        where: {
          name: {
            contains: input.name,
          },
        },
      });
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      schoolId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.class.create({
        data: {
          name: input.name,
          schoolId: input.schoolId,
        }
      })
    }),
});
