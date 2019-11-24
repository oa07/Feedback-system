/* eslint-disable no-loop-func */
const request = require('supertest-as-promised');
const chai = require('chai');
const randomize = require('randomatic');
const random = require('random-name');
const app = require('../../index');

const { expect } = chai;
chai.config.includeStack = true;

const registrationData = {
  name: `${random.first()} ${random.middle()} ${random.last()}`,
  email: `${random.first() +
    random.middle() +
    random.last()}@student.cse.du.ac.bd`,
  password: '!QAZ^YHN7ujm',
  role: 'researcher',
  phoneNumber: randomize('0', 11)
};
const loginData = {
  email: 'KalaMannyAustreng@student.cse.du.ac.bd',
  password: registrationData.password
};

const questionSet = {
  _id: '5dcfa431c10805348a7d917d',
  numberOfQuestions: 2,
  willShowTill: 5,
  tag: ['music', 'cloths', 'anime', 'food'],
  ques1: 'Hello!! How are you?',
  ansType1: 'textbox',
  ques2: 'your gender??',
  ansType2: 'checkbox',
  options2: ['male', 'female']
};

describe('researcher module', () => {
  describe(`Registration testing for researcher`, () => {
    it('should successfully create account for researcher', done => {
      request(app)
        .post('/api/v1/account/register')
        .send(registrationData)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });

  describe('Researcher routes', () => {
    let accessToken;
    let questionSetID = '5dce1de072c08c2fec5863ba';

    beforeEach(done => {
      request(app)
        .post('/api/v1/account/login')
        .send(loginData)
        .expect(200)
        .then(res => {
          accessToken = res.body.accessToken;
          done();
        })
        .catch(done);
    });

    describe('submit question set', () => {
      it('should take question set', done => {
        request(app)
          .post('/api/v1/researcher/submitQuestions')
          .set('authorization', `bearer ${accessToken}`)
          .send(questionSet)
          .expect(201)
          .then(res => {
            questionSetID = '5dce1de072c08c2fec5863ba';
            done();
          })
          .catch(done);
      });
    });

    describe('Audience Review', () => {
      it('should Show Audience Review in a particular Question Set', done => {
        request(app)
          .get(
            `/api/v1/researcher/seeAudienceReview?questionSetID=${questionSetID}`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('Audience valid Review', () => {
      it('should Show Valid Reviews in a particular Question Set', done => {
        request(app)
          .get(
            `/api/v1/researcher/seeValidAudienceReview?questionSetID=${questionSetID}`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('Top Users', () => {
      it('should Show top 200 users in a particular Question', done => {
        request(app)
          .get(
            `/api/v1/researcher/topAudienceInQuestionSet?questionSetID=${questionSetID}`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('Count of Question set', () => {
      it('should Show total number of each Question Set', done => {
        request(app)
          .get(`/api/v1/researcher/totalQuesSetCount`)
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('Analysis Report', () => {
      it('should create Analysis Report', done => {
        request(app)
          .get(
            `/api/v1/researcher/analysisReport?questionSetID=${questionSetID}`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('Filter question set based on tag', () => {
      it('should Filter question set based on tag', done => {
        request(app)
          .get('/api/v1/researcher/filterBasedOnTag?tag=anime')
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
  });
});
