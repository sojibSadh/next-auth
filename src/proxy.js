import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(req) {
    const token = await getToken({req});
    const reqPath = req.nextUrl.pathname;
    const isAuthenticated = Boolean(token);
    const isUser = token.role === "user";

    const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));

    if(!isAuthenticated && isPrivate) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url))
    }

//   return NextResponse.redirect(new URL('/home', request.url))
return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/secret/:path*"],
}