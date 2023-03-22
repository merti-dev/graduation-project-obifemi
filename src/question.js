class Question {
  constructor({ question, options, answer, level }) {
    this.question = question
    this.options = options
    this.answer = answer
    this.level = level
  }
}
// The problem arises here when I dont use another file as b2.js and I try to export the questions from this file.
const B2 = [
  new Question({
    question: 'Ich gehe ___ Schule.',
    options: ['zur', 'in die', 'auf die', 'an die'],
    answer: 'zur',
    level: 'B2',
  }),
  new Question({
    question: 'Ich komme ___ Deutschland.',
    options: ['aus', 'von', 'nach', 'zu'],
    answer: 'aus',
    level: 'B2',
  }),
  new Question({
    question: 'Ich wohne ___ Berlin.',
    options: ['in', 'auf', 'an', 'bei'],
    answer: 'in',
    level: 'B2',
  }),
  new Question({
    question: 'Ich fahre ___ Arbeit.',
    options: ['zur', 'in die', 'auf die', 'an die'],
    answer: 'zur',
    level: 'B2',
  }),
  new Question({
    question: 'Ich bin ___ Bahnhof.',
    options: ['am', 'im', 'auf dem', 'in dem'],
    answer: 'am',
    level: 'B2',
  }),
]

module.exports = { Question, B2 }
