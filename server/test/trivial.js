process.env.NODE_ENV = 'test';

const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Trivial API functionality', () => {

    it('Correctly sends the welcome page', () => {
        return chai.request(app)
            .get('/')
            .send({})
            .then(res => {
                expect(res).to.have.status(200);
            })
            .catch(err => {
                throw err;
            });
    });

});