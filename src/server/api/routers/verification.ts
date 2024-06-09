/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = 'django-insecure-bf!o9lg2(%u6da%wcb(_d_tn75khppejh*umnx&xd8zp()3t!='; // Make sure to use a secure key

export const createVerificationSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  key: z.string().length(8, "Key must be exactly 8 characters long"),
});

export const verificationRouter = createTRPCRouter({
  create: publicProcedure
    .input(createVerificationSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password, key } = input;
      const isOtpVerified = await ctx.db.otp.findFirst({
        where: {
          email,
          key,
          is_active: true,
          is_deleted: false,
        },
      });

      if (isOtpVerified) {
        const user = await ctx.db.user.create({
          data: {
            name,
            email,
            password,
            user_id: generateRandomUserId(),
          },
        });
        await ctx.db.otp.update({
          where: {
            id: isOtpVerified.id,
          },
          data: {
            is_active: false,
            is_deleted: true,
          },
        });

        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
        return {
          token,
        };
      } else {
        throw new Error('Invalid Otp');
      }
    }),
});

function generateRandomUserId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let user_id = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    user_id += characters.charAt(randomIndex);
  }
  return user_id;
}
