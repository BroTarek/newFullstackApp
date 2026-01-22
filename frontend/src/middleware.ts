import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('usertoken')?.value;
    const { pathname } = request.nextUrl;

    // Protected routes
    const protectedRoutes = ['/cart', '/profile', '/wish-list'];

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cart/:path*', '/profile/:path*', '/wish-list/:path*'],
};
