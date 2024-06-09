import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { signUpRouter } from "./routers/sign_up";
import { verificationRouter } from "./routers/verification";
import { loginRouter } from "./routers/login";
import { renderCategories } from "./routers/render_categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sign_up: signUpRouter,
  verify_otp: verificationRouter,
  login:loginRouter,
  renderCategories:renderCategories
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
