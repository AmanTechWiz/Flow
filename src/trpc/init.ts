import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { cache } from 'react';
import { auth } from '@clerk/nextjs/server';

export const createTRPCContext = cache(async () => {
  return { auth : await auth()};
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create({
   transformer: superjson,
});

const isAuthed = t.middleware(({next,ctx}) => {
  if(!ctx.auth.userId){
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated"
    });
  }

  return next({
    ctx:{
      auth: ctx.auth, 
    }
  })
})

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);