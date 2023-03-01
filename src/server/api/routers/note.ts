import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getAll: publicProcedure
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
        include:{
          course: true,
          user: true,
        }
      });
    }),
    searchFirst: publicProcedure
      .input(z.object({
        name: z.string(),
      }))
      .query(
        ({input, ctx}) => {
          return ctx.prisma.note.findFirst({
            where:{
              name: {
                equals: input.name,
              },
            },
          });
        }),
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      path: z.string(),
      courseId: z.string(),
    }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.create({
        data: {
          name: input.name,
          path: input.path,
          courseId: input.courseId,
          userId: ctx.session.user.id,
        }
      })
    }),
});
