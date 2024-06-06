import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});


export const signUpRouter = createTRPCRouter({
    create: publicProcedure.
    input(signUpSchema).
    mutation(async ({ ctx, input }) => {
        const { name, email, password } = input;
        const existingUser = await ctx.db.user.findUnique({
            where: { email },
          });
        if (existingUser) {
            throw new Error('Email already exists');
          }
          await ctx.db.user.create({
            data: {
              name,
              email,
              password,
            },
          });
    
          return { success: true };
        }),
})