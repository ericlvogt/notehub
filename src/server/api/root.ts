import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { noteRouter } from "./routers/note";
import { courseRouter } from "./routers/course";
import { schoolRouter } from "./routers/school";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  note: noteRouter,
  course: courseRouter,
  school: schoolRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
