import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getAll: publicProcedure
    // .input(z.object({ text: z.string() }))
    .query(({ ctx }) => {
      return ctx.prisma.note.findMany();
    }),

  search: publicProcedure
    .input(z.object({
      name: z.string(),
    }))
    .query(({ input, ctx }) => {
      return ctx.prisma.note.findMany({
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
      path: z.string(),
      classId: z.string(),
    }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.note.create({
        data: {
          name: input.name,
          path: input.path,
          classId: input.classId,
          userId: ctx.session.user.id,
        }
      })
    }),
});
