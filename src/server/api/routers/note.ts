import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getAll: publicProcedure
    // .input(z.object({ text: z.string() }))
    .query(({ ctx }) => {
      return ctx.prisma.note.findMany();
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      path: z.string(),
      creator: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.note.create({
        data: {
          name: input.name,
          path: input.path,
          creator: input.creator,
        }
      })
    }),

//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
});
