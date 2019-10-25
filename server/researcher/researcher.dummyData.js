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


let data = {};
data.numberOfQuestions = Math.floor(Math.random() * 10) + 1;
data.tag = 'music';
const ansTypes = ['textbox', 'textarea', 'radiobox', 'checkbox'];
for (let i = 1; i <= data.numberOfQuestions; i++) {
  data[`ques${i}`] = 'here is the question';
  data[`ansType${i}`] = ansTypes[i % 4];
  if (data[`ansType${i}`] === 'textbox' || data[`ansType${i}`] === 'textarea') continue;
  let len = 1 + (Math.floor(Math.random() * 10) + 1) % 5;
  data[`options${i}`] = [];
  for (let ii = 0; ii < len; ii++) {
    data[`options${i}`].push(`option ${ii + 1}`);
  }
}

module.exports.researcherQuestions = data;
module.exports.vaildData = vaildData;
module.exports.numberOfQuestion = numberOfQuestion;
module.exports.correctAnswerType = correctAnswerType;
module.exports.userAnswerType = userAnswerType