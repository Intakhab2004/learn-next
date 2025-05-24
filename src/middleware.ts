import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;

    const isPublicPath = (path === '/signup') || (path === '/login') || (path === '/verifyemail') || (path === '/');
    const token = request.cookies.get("Token")?.value || "";

    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }

    if((!isPublicPath && !token)){
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

// matchers
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile/:path*',
        '/verifyemail'
    ]
}