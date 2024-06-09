/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string()
});

const JWT_SECRET = 'django-insecure-bf!o9lg2(%u6da%wcb(_d_tn75khppejh*umnx&xd8zp()3t!='; // Make sure to use a secure key


export const loginRouter = createTRPCRouter({
    create: publicProcedure.
    input(loginSchema).
    mutation(async ({ ctx, input }) => {
        const {email, password } = input;
        const existingUser = await ctx.db.user.findUnique({
            where: { email,
            password },
          });
        if (existingUser) {
            const token = jwt.sign({ user_id: existingUser.user_id }, JWT_SECRET, { expiresIn: '1h' });
            return {
            token,
            };
          }
        else{
            throw new Error('Invalid Email or Password');
        }
        }),
})