/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

export const renderCategories = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      page: z.number().min(1),
      pageSize: z.number().min(1)
    }))
    .query(async ({ input, ctx }) => {
      const { page, pageSize } = input;
      const categories = await ctx.db.category.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
      });
      const totalCategories = await ctx.db.category.count();
      return { categories, totalCategories };
    }),
  selectCategory: publicProcedure
    .input(z.object({
      userId: z.string(),
      categoryId: z.number(),
    }))
    .mutation(async ({ctx, input }) => {
      const { userId, categoryId } = input;
      await ctx.db.userCategory.upsert({
        where: {
          userId_categoryId: { userId, categoryId },
        },
        update: {},
        create: {
          userId,
          categoryId,
        },
      });
    }),

  getUserCategories: publicProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .query(async ({ctx, input }) => {
      const { userId } = input;
      const userCategories = await ctx.db.userCategory.findMany({
        where: { userId },
        select: { categoryId: true },
      });
      return userCategories.map(uc => uc.categoryId);
    }),
});
