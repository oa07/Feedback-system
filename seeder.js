const questionSet = {
  _id: '5dce1de072c08c2fec5863ba',
  tag: ['music', 'cloths'],
  approved: false,
  stars: [],
  numberOfQuestions: 2,
  willShowTill: '2019-11-20T03:39:12.177Z',
  researcherID: '5dcfeeb5ee99193d848a4f85',
  questions: [
    {
      options: [],
      _id: '5dce1de072c08c2fec5863bc',
      question: 'Hello!! How are you?',
      ansType: 'textbox'
    },
    {
      options: ['male', 'female'],
      _id: '5dce1de072c08c2fec5863bb',
      question: 'your gender??',
      ansType: 'checkbox'
    }
  ],
  __v: 0
};
const response = {
  _id: '5dce305009c1d1408af54aaf',
  approved: false,
  answers: ['Hi!! Ha Valo Asi ami', 'Female'],
  researcherID: '5dcfeeb5ee99193d848a4f85',
  audienceID: '5dcfeeb7ee99193d848a4f86',
  questionSetID: '5dce1de072c08c2fec5863ba',
  __v: 0
};

const accounts = [
  {
    _id: '5dcfeeb5ee99193d848a4f85',
    isAccountVerified: false,
    isAccountActive: true,
    name: 'Lettie Aguste Garvin',
    email: 'KalaMannyAustreng@student.cse.du.ac.bd',
    phoneNumber: '39800887615',
    role: 'researcher',
    password: '$2a$10$h.TLNez5IWDtn8HWF6nWquN8.iTN2ytmiJOd1Z8iZ5CvkQzlnK5/2',
    __v: 0
  },
  {
    _id: '5dcfeeb7ee99193d848a4f87',
    isAccountVerified: false,
    isAccountActive: true,
    name: 'Nanete Errick Frederich',
    email: 'JuliannWittyIlaire@student.cse.du.ac.bd',
    phoneNumber: '87165533729',
    role: 'admin',
    password: '$2a$10$8C8a/8BxkW0ZL7NqQv2X6eBFPz/zdtt2v4x83PZXOHqdE9hhndxES',
    __v: 0
  },
  {
    _id: '5dcfeeb7ee99193d848a4f86',
    isAccountVerified: false,
    isAccountActive: true,
    name: 'Diana Si Carlton',
    email: 'DeenaBriceFagin@student.cse.du.ac.bd',
    phoneNumber: '67520976339',
    role: 'audience',
    password: '$2a$10$7/iIb3yNhT88iH4gv0/yheKwb9QLtWMvsLWumtWh33JtRI0ee3WwO',
    __v: 0
  }
];

const mongoose = require('mongoose');
require('dotenv').config();
require('colors');
const {
  ResearcherQuestionSetModel
} = require('./server/researcher/researcher.model');
const { AccountModel } = require('./server/account/account.model');
const {
  AudienceQuestionSubmitModel
} = require('./server/audience/audience.model');

mongoose.connect(process.env.MONGOURI_TEST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const importData = async () => {
  try {
    await AccountModel.create(accounts);
    await ResearcherQuestionSetModel.create(questionSet);
    await AudienceQuestionSubmitModel.create(response);
    console.log('data imported'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await AccountModel.deleteMany();
    await ResearcherQuestionSetModel.deleteMany();
    await AudienceQuestionSubmitModel.deleteMany();
    console.log('data deleted'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
