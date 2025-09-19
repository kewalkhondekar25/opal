import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(["/", "/auth(.*)", "/api/webhook/clerk"])

export default clerkMiddleware(async (auth, request) => {
  
  const { userId } = await auth();

  if(isPublicRoute(request)){
    
    if(userId){
      return NextResponse.redirect(new URL("/dashboard", request.url));
    };

    return;
  };
  
  if(!userId){
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  };
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}