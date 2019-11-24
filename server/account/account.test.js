/* eslint-disable no-loop-func */
const request = require('supertest-as-promised');
const chai = require('chai');
const randomize = require('randomatic');
const random = require('random-name');
const app = require('../../index');

const { expect } = chai;
chai.config.includeStack = true;

const roles = ['researcher', 'audience', 'admin'];

describe('account module', () => {
  for (let i = 0; i < 3; i++) {
    const registrationData = {
      name: `${random.first()} ${random.middle()} ${random.last()}`,
      email: `${random.first() +
        random.middle() +
        random.last()}@student.cse.du.ac.bd`,
      password: '!QAZ^YHN7ujm',
      role: roles[i],
      phoneNumber: randomize('0', 11)
    };
    const loginData = {
      email: registrationData.email,
      password: registrationData.password
    };

    describe(`Registration testing for ${roles[i]}`, () => {
      it(`should successfully create Account for ${roles[i]}`, done => {
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

    describe(`Login testing for ${roles[i]}`, () => {
      it(`should successfully sign in for ${roles[i]}`, done => {
        request(app)
          .post('/api/v1/account/login')
          .send(loginData)
          .expect(200)
          .then(res => {
            done();
          })
          .catch(done);
      });
    });
  }
});
