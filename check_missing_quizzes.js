
const fs = require('fs');
const path = require('path');

try {
    const filePath = path.join(process.cwd(), 'src/locales/en.js');
    let content = fs.readFileSync(filePath, 'utf8');

    // Transform to executable JS
    content = content.replace('export const en =', 'const en =');
    content += '; return en;';

    // Execute
    const func = new Function(content);
    const en = func();

    if (!en.areas) {
        console.error('ERROR: en.areas is missing');
        process.exit(1);
    }

    console.log('Areas missing quizzes:');
    Object.keys(en.areas).forEach(areaId => {
        if (!en.areas[areaId].quiz) {
            console.log(`- ${areaId}`);
        }
    });

} catch (err) {
    console.error('CRITICAL ERROR:', err.message);
}
