import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SESSION_TOKEN = 'rearendclaims_admin_session_2024';
const SETTINGS_PATH = join(process.cwd(), 'src', 'data', 'settings.json');

function isAuthenticated(request) {
    const session = request.cookies.get('admin_session');
    return session?.value === SESSION_TOKEN;
}

function readSettings() {
    try {
        const raw = readFileSync(SETTINGS_PATH, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return {
            siteTitle: 'Car Accident Attorneys',
            siteDescription: 'Top-rated Las Vegas injury lawyers.',
            siteUrl: 'https://www.rearendclaims.com',
            ga4MeasurementId: 'G-XXXXXXXXXX',
            ogImage: '/logo.png',
            schemaData: {},
        };
    }
}

// GET — read current settings
export async function GET(request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = readSettings();
    return NextResponse.json(settings);
}

// POST — update settings
export async function POST(request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const current = readSettings();
        const updated = { ...current, ...body };

        writeFileSync(SETTINGS_PATH, JSON.stringify(updated, null, 2), 'utf-8');

        return NextResponse.json({ success: true, settings: updated });
    } catch {
        return NextResponse.json(
            { error: 'Failed to save settings' },
            { status: 500 }
        );
    }
}
