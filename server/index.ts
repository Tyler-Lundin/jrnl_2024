import prisma from '@/server/db';
import { publicProcedure, router } from './trpc';

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const users = await prisma.user.findMany();
      return users;
    }),
});
