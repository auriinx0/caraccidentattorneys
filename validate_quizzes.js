
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

    console.log('EN object loaded successfully.');

    if (!en.areas) {
        console.error('ERROR: en.areas is missing');
        process.exit(1);
    }

    let errorCount = 0;

    Object.keys(en.areas).forEach(areaId => {
        const area = en.areas[areaId];
        if (area.quiz) {
            if (!area.quiz.questions || !Array.isArray(area.quiz.questions)) {
                console.error(`ERROR [${areaId}]: Quiz defined but questions missing or not array.`);
                errorCount++;
                return;
            }

            area.quiz.questions.forEach((q, idx) => {
                if (!q.options || !Array.isArray(q.options)) {
                    console.error(`ERROR [${areaId} Q${idx}]: Options missing or not array.`);
                    errorCount++;
                } else {
                    if (typeof q.answer !== 'number') {
                        console.error(`ERROR [${areaId} Q${idx}]: Answer is not a number. Got: ${typeof q.answer}`);
                        errorCount++;
                    } else if (q.answer < 0 || q.answer >= q.options.length) {
                        console.error(`ERROR [${areaId} Q${idx}]: Answer index ${q.answer} is out of bounds for options length ${q.options.length}.`);
                        errorCount++;
                    }
                }
            });
        }
    });

    if (errorCount === 0) {
        console.log('All quizzes passed validation!');
    } else {
        console.log(`Found ${errorCount} errors in quizzes.`);
    }

} catch (err) {
    console.error('CRITICAL ERROR:', err.message);
}
