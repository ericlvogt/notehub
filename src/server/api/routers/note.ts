import { Note } from "@prisma/client";
import { z } from "zod";
import getFilePath from "../../lib/getFilePath";
import saveFile from "../../lib/saveFile";
import {readFileSync} from "fs"

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.note.findMany({
        where: {
          name: {
            contains: input.name,
          },
        },
        include: {
          course: {
            include: {
              school: true,
            },
          },
          user: true,
        },
      });
    }),
  searchFirst: publicProcedure
    .input(
      z.object({
        name: z.string(),
        userName: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.note.findFirst({
        where: {
          name: {
            equals: input.name,
          },
          user: {
            name: {
              equals: input.userName,
            },
          },
        },
      });
    }),
  getFile: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({input, ctx}) => {
      const note: Note | null = await ctx.prisma.note.findFirst({
        where: {
          id: {
            equals: input.id,
          },
        },
      });

      if (note === null){
        return "";
      }

      return readFileSync(note.path as string).toString();
    }

    ),
  saveFile: protectedProcedure
    .input(
      z.object({
        noteId: z.string(),
        fileName: z.string(),
        data: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const path = getFilePath(input);
      saveFile({ path, ...input });
      return await ctx.prisma.note.update({
        where: {
          id: input.noteId,
        },
        data: {
          path: path,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        path: z.string(),
        courseId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.create({
        data: {
          name: input.name,
          path: input.path,
          courseId: input.courseId,
          userId: ctx.session.user.id,
        },
      });
    }),
});
