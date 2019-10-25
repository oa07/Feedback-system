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
const vaildData = [
  {
    id: '11',
    username: "sakib",
    role: "researcher",
    email: "sakibkhan111296@gmail.com",
    password: "123456789"
  },
  {
    id: '22',
    username: "rahat",
    role: "admin",
    email: "twopie25sf@gmail.com",
    password: "123456789"
  },
  {
    id: '33',
    username: "fahim",
    role: "audience",
    email: "sksmphoto2503@gmail.com",
    password: "123456789"
  }
]

module.exports.vaildData = vaildData;
module.exports.numberOfQuestion = numberOfQuestion;
module.exports.correctAnswerType = correctAnswerType;
module.exports.userAnswerType = userAnswerType