import { z } from "zod";
import saveFile from "../../lib/saveFile";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
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
          course: {
            include: {
              school: true
            }
          },
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
  saveFile: protectedProcedure
    .input(z.object({
      noteId: z.string(),
      fileName: z.string(),
    }))
    .mutation(async ({input}) => {
      return await saveFile(input);
    }
    ),
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
