import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const { search, hostname, href, origin, port, } = request.nextUrl;


    const publicPaths = ['/login', '/register'];
    // extracting token
    const cookie = request.cookies.get('access')?.value || ''

    if (!cookie && path.startsWith('/otp')) {
        return NextResponse.next()
        // return NextResponse.rewrite(new URL(path, request.url))
    }


    if (!cookie && !publicPaths.includes(path)) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))

    } else if ((publicPaths.includes(path) || path.startsWith('/otp')) && cookie) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/otp/(.*)',
    ]
}