
const fs = require('fs');
const path = require('path');

try {
    const filePath = path.join(process.cwd(), 'src/locales/vi.js');
    let content = fs.readFileSync(filePath, 'utf8');

    // Transform to executable JS
    content = content.replace('export const vi =', 'const vi =');
    content += '; return vi;';

    // Execute
    const func = new Function(content);
    const vi = func();

    console.log('VI object loaded successfully.');

    if (!vi.categories) {
        console.error('ERROR: vi.categories is missing');
    } else {
        console.log('vi.categories exists.');
    }

    // Check keys
    const expectedCategories = ['cat-vehicle', 'cat-products', 'cat-injury'];
    expectedCategories.forEach(id => {
        if (!vi.categories[id]) console.error(`MISSING CATEGORY: ${id}`);
    });

    const expectedAreas = [
        'car-accidents', 'motorcycle', 'commercial', 'boating', 'bus', 'rideshare', 'pedestrian', 'passenger',
        'slip-fall', 'construction', 'brain', 'mesh', 'hair', 'roundup', 'talc', 'ozempic', 'truvada'
    ];
    expectedAreas.forEach(id => {
        if (!vi.areas[id]) console.error(`MISSING AREA: ${id}`);
    });

    // Check strict syntax by JSONifying (circular refs aside, strict structure)
    try {
        JSON.stringify(vi);
        console.log('VI object structure is valid JSON-compatible (mostly).');
    } catch (e) {
        console.warn('VI object has issues stringifying (might be normal if circular, but checking syntax):', e.message);
    }

} catch (err) {
    console.error('CRITICAL SYNTAX ERROR in vi.js:', err.message);
    // Print context around error if possible?
}
