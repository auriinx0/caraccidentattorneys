import { CATEGORY_STRUCT, AREA_STRUCT } from '../constants';

const BASE_URL = 'https://www.rearendclaims.com';

export default function sitemap() {
    const now = new Date().toISOString();

    // Static pages
    const staticPages = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/results`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    // Category pages
    const categoryPages = CATEGORY_STRUCT.map((cat) => ({
        url: `${BASE_URL}/category/${cat.id}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Practice area detail pages
    const areaPages = AREA_STRUCT.map((area) => ({
        url: `${BASE_URL}/practice-area/${area.id}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
    }));

    return [...staticPages, ...categoryPages, ...areaPages];
}
