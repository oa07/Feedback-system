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
  role: 'admin',
  phoneNumber: randomize('0', 11)
};
const loginData = {
  email: 'JuliannWittyIlaire@student.cse.du.ac.bd',
  password: registrationData.password
};
describe('admin module', () => {
  describe(`Registration testing for admin`, () => {
    it('should successfully create account for admin', done => {
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

  describe('Admin routes', () => {
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
    describe('See all question lists', () => {
      it('should Show all question lists', done => {
        request(app)
          .get('/api/v1/admin/show-all-question-set')
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });

    describe('Disapproved audiences', () => {
      it('should Show Disapproved audiences', done => {
        request(app)
          .get('/api/v1/admin/disapproved-audience')
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            questionSetID = '5dce1de072c08c2fec5863ba';
            done();
          })
          .catch(done);
      });
    });

    describe(' Promotional Mail To Users', () => {
      it('Should get Promotional Mail To Users', done => {
        request(app)
          .post(`/api/v1/admin/promotionalMailToUsers`)
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('see Audience review', () => {
      it('should show Audience review', done => {
        request(app)
          .get(
            `/api/v1/admin/answer-of-audience?questionSetID=5dce1de072c08c2fec5863ba`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });

    describe('disapproved Question Sets', () => {
      it('should Show disapproved Question Sets', done => {
        request(app)
          .get(`/api/v1/admin/disapprovedQuestionSets`)
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('Disapproved Answers', () => {
      it('should Show Disapproved Answers', done => {
        request(app)
          .get(
            `/api/v1/admin/disapprovedAnswers?questionSetID=5dce1de072c08c2fec5863ba`
          )
          .set('authorization', `bearer ${accessToken}`)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
    describe('top 200 responses', () => {
      it('should Show Top 200 responses in a particular Question', done => {
        request(app)
          .get(
            `/api/v1/admin/topResponse?questionSetID=5dce1de072c08c2fec5863ba`
          )
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
