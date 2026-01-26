import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function proxy(req: NextRequest) {
    // Only run on admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {

        // Ignore login page
        if (req.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = req.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        const payload = await verifyToken(token);

        if (!payload) {
            // Token invalid
            const response = NextResponse.redirect(new URL('/admin/login', req.url));
            response.cookies.delete('admin_token');
            return response;
        }

        // Token valid, proceed
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
