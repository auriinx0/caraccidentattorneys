const { en } = require('./src/locales/en');

console.log("Checking car-accidents quiz...");
const carQuiz = en.areas['car-accidents'].quiz;

if (carQuiz) {
    console.log("Quiz FOUND:");
    console.log(JSON.stringify(carQuiz, null, 2));
} else {
    console.error("Quiz NOT FOUND for car-accidents");
}
