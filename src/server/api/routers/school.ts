import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const schoolRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.school.findMany();
    }),

  search: publicProcedure
    .input(z.object({
      name: z.string(),
    }))
    .query(({ input, ctx }) => {
      return ctx.prisma.school.findMany({
        where: {
          name: {
            contains: input.name,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
    }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.school.create({
        data: {
          name: input.name,
        }
      })
    }),
});
