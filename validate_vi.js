
const { vi } = require('./src/locales/vi.js');
const { CATEGORY_STRUCT, AREA_STRUCT } = require('./src/constants.js');

console.log('Loading vi.js...');

if (!vi) {
    console.error('vi export is undefined');
    process.exit(1);
}

if (!vi.categories) {
    console.error('vi.categories is undefined');
    process.exit(1);
}

if (!vi.areas) {
    console.error('vi.areas is undefined');
    process.exit(1);
}

console.log('Checking categories...');
const expectedCategories = ['cat-vehicle', 'cat-products', 'cat-injury'];
expectedCategories.forEach(id => {
    if (!vi.categories[id]) {
        console.error(`Missing category: ${id}`);
        process.exit(1);
    }
});

console.log('Checking areas...');
const expectedAreas = [
    'car-accidents', 'motorcycle', 'commercial', 'boating', 'bus', 'rideshare', 'pedestrian', 'passenger',
    'slip-fall', 'construction', 'brain', 'mesh', 'hair', 'roundup', 'talc', 'ozempic', 'truvada'
];

expectedAreas.forEach(id => {
    if (!vi.areas[id]) {
        console.error(`Missing area: ${id}`);
        // Log keys to see what IS there
        console.log('Available keys:', Object.keys(vi.areas));
        process.exit(1);
    }
});

console.log('Validation passed!');
