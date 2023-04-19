// Imports the index.js file to be tested.
const server = require('../index'); //TO-DO Make sure the path to your index.js is correctly added
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });

  // ===========================================================================
  // TO-DO: Part A Login unit test case

  //We are checking POST /login API by passing the user info in the correct order. This test case should pass and return a status 200 along with a "Success" message.
  //Positive cases
  it('positive : /login', done => {
    chai
      .request(server)
      .post('/login')
      .send({input_username: 'testuser1', input_password: 'testpassword1'})
      .end((err, res) => {
        expect(res).to.have.status(302); //A successful response should forward to the discover page.
        expect(res.body.message).to.equals('Success');
        done();
      });
  });

  //We are checking POST /login API by passing an incorrect password to a corresponding username. 
  it('Negative : /login. Checking incorrect password', done => {
    chai
      .request(server)
      .post('/login')
      .send({input_username: 'testuser1', input_password: 'testpassword2'})
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equals('Incorrect username or password');
        done();
      });
  });

  // ===========================================================================
  // TO-DO: Part B Register unit test case

  //We are checking POST /register API by passing the user info in the correct order. This test case should pass and return a status 200 along with a "Success" message.
  //Positive cases
  it('positive : /register', done => {
    chai
      .request(server)
      .post('/register')
      .send({input_username: 'newtestuser1', input_password: 'newtestpassword1'})
      .end((err, res) => {
        expect(res).to.have.status(302); //A successful response should forward to the login page.
        expect(res.body.message).to.equals('Success');
        done();
      });
  });

  //We are checking POST /register API by passing an already existing username and password.
  it('Negative : /register. Checking username already in use.', done => {
    chai
      .request(server)
      .post('/register')
      .send({input_username: 'newtestuser1', input_password: 'newtestpassword2'})
      .end((err, res) => {
        expect(res).to.have.status(400); //A request with a username that already exists in the database should fail.
        expect(res.body.message).to.equals('Registration failed');
        done();
      });
  });
});