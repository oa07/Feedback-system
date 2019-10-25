let numberOfQuestion = Math.floor(Math.random() * 10) + 1;
let dataTypes = ['boolean', 'string', 'number'];

const correctAnswerType = [];
for (let i = 0; i < numberOfQuestion; i++) {
  correctAnswerType.push({
    type: dataTypes[i % 3]
  })
}

const userAnswerType = [];
let userDataTypes = ['boolean', 'string', 'number', 'undefined'];
for (let i = 0; i < numberOfQuestion; i++) {
  userAnswerType.push({
    type: userDataTypes[(Math.floor(Math.random() * 10) + 1) % 4]
  });
}

module.exports.numberOfQuestion = numberOfQuestion;
module.exports.correctAnswerType = correctAnswerType;
module.exports.userAnswerType = userAnswerType