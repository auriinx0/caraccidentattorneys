
import { vi } from './src/locales/vi.js';

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
// Defined manually as importing constants might fail if they use jsx (lucide-react icons)
const expectedAreas = [
    'car-accidents', 'motorcycle', 'commercial', 'boating', 'bus', 'rideshare', 'pedestrian', 'passenger',
    'slip-fall', 'construction', 'brain', 'mesh', 'hair', 'roundup', 'talc', 'ozempic', 'truvada'
];

expectedAreas.forEach(id => {
    if (!vi.areas[id]) {
        console.error(`Missing area: ${id}`);
        console.log('Available keys:', Object.keys(vi.areas));
        process.exit(1);
    }
});

console.log('Validation passed!');
