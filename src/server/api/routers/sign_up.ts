/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  create: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      // Check if the user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Generate or resend OTP
      const is_active = true;
      const is_deleted = false;
      const isActiveOtp = await ctx.db.otp.findFirst({
        where: { email, is_active, is_deleted },
      });

      if (isActiveOtp) {
        await sendOtpViaGmail(email, isActiveOtp.key);
      } else {
        const key = generateRandomKey(email);
        await ctx.db.otp.create({
          data: {
            key,
            email,
            is_active,
            is_deleted,
          },
        });
        await sendOtpViaGmail(email, key);
      }

      return { success: true };
    }),
});

function generateRandomKey(email: string) {
  let key = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 8; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return key;
}

async function sendOtpViaGmail(email: string, key: string) {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "varunpersonal4@gmail.com",
      pass: "rmks bpqe fkfh izgi",
    },
  });

  const mailOptions = {
    from: "varunpersonal4@gmail.com",
    to: email,
    subject: "Otp Verification",
    text: `${key} is your verification key`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: never) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}
