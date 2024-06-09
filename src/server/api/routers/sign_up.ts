import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createOrResendOtp } from "../utils/create_otp_helper";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});


export const signUpRouter = createTRPCRouter({
    create: publicProcedure.
    input(signUpSchema).
    mutation(async ({ ctx, input }) => {
        const {name,email,password} = input;
        const existingUser = await ctx.db.user.findUnique({
            where: {name,email,password},
          });
        if (existingUser) {
            throw new Error('Email already exists');
          }
        void createOrResendOtp(email)
        return { success: true };
        }),
})