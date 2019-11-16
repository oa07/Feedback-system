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
  role: 'audience',
  phoneNumber: randomize('0', 11)
};
const loginData = {
  email: 'DeenaBriceFagin@student.cse.du.ac.bd',
  password: registrationData.password
};
describe('audience module', () => {
  describe(`Registration testing for audience`, () => {
    it('should successfully create account for audience', done => {
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

  describe('Audience routes', () => {
    let accessToken;
    let questionSetID = '5dce1de072c08c2fec5863ba';
    const responseID = '5dce305009c1d1408af54aaf';

    beforeEach(done => {
      request(app)
        .post('/api/v1/account/login')
        .send(loginData)
        .expect(200)
        .then(res => {
          accessToken = res.body.accessToken;
          questionSetID = '5dce1de072c08c2fec5863ba';
          done();
        })
        .catch(done);
    });
    describe('checking for the question set', () => {
      it('should find that particlar question set', done => {
        request(app)
          .get('/api/v1/audience/checkForASet/5dce1de072c08c2fec5863ba')
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });

    describe('Show Question Set', () => {
      it('should Show Question Set on a certain tag', done => {
        request(app)
          .get('/api/v1/audience/showListOfQuestions?tag=music')
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            questionSetID = '5dce1de072c08c2fec5863ba';
            done();
          })
          .catch(done);
      });
    });

    describe('Rate Question Set', () => {
      it('Audience should rate Question Set', done => {
        request(app)
          .post(
            `/api/v1/audience/rateQuestionList?questionSetID=5dce1de072c08c2fec5863ba&star=2`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('Answer in any Question Set', () => {
      it('Audience can answer in any Question Set', done => {
        request(app)
          .post(`/api/v1/audience/answerQuestions/5dce1de072c08c2fec5863ba`)
          .send({
            ans1: 'Hi!! I am fine. You??',
            ans2: 'Female'
          })
          .set('authorization', `bearer ${accessToken}`)
          .expect(201)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });

    describe('User reached to a question set', () => {
      it('should Show number of User reached to a question set', done => {
        request(app)
          .get(`/api/v1/audience/userReached/5dce1de072c08c2fec5863ba`)
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('See my response - Audience', () => {
      it('should Show See my response - Audience', done => {
        request(app)
          .get(
            `/api/v1/audience/seeResponse/?questionSetID=5dce1de072c08c2fec5863ba`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('update response', () => {
      it('should update response', done => {
        request(app)
          .put(`/api/v1/audience/updateResponse/5dce305009c1d1408af54aaf`)
          .send({
            ans1: 'I am fine and you???',
            ans2: 'male'
          })
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
