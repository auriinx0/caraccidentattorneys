import { NextResponse } from 'next/server';

// ── Hardcoded credentials (hashed comparison) ───────────────────────
const ADMIN_USERNAME = 'kirknelius';
// In a real app you'd hash this — for this lightweight admin we compare directly
const ADMIN_PASSWORD = 'DarnellDewberrywubsF3nt!';
const SESSION_TOKEN = 'rearendclaims_admin_session_2024';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const response = NextResponse.json({ success: true });
            response.cookies.set('admin_session', SESSION_TOKEN, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24, // 24 hours
            });
            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request' },
            { status: 400 }
        );
    }
}
