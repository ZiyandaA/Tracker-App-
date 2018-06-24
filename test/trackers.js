process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

let models = require('../models');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Trackers', () => {
    beforeEach(done => {
        models.Tracker.remove({}, err => {
          done();
        });
    });

    describe('/GET trackers', () => {
        it('should get all the trackers', done => {
            chai.request(server)
                .get('/trackers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                })
                done();
        })
    });

    describe('/POST wrong tracker',() => {
        it('should not post tracker', done => {
            let tracker = {
                userID: "qwef",
                name: "drinks"
            };
            chai.request(server)
                .post('/trackers')
                .send(tracker)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('err');
                    res.body.should.be.a('object');

                });
                done();
        })
    });

})


