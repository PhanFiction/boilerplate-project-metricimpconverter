const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 5L', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '5L' })
      .end(function(err, res) {
        assert.equal(res.body.initNum, 5);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 1.32086);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Convert an invalid input such as 12g', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '12g' })
      .end(function(err, res) {
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number such as 1/5.2/4kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '1/5.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number AND unit such as 2/5.2/4kilomet', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '2/5.2/4kilomet' })
      .end(function(err, res) {
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number such as kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});
