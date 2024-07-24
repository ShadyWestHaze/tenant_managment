import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  if (token) {
    const managerRoutes = ["/add-manager", "/create-payment", "/managerDashboard"];
    const requestedPath = request.nextUrl.pathname;

    if (managerRoutes.includes(requestedPath) && !token.ismanager) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    const signInUrl = new URL("/api/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/payments", "/add-manager", "/create-payment", "/managerDashboard"],
};
