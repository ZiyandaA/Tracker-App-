process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

let models = require('../models');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Trackertargets', () => {
    beforeEach(done => {
        models.Tracker.remove({}, err => {
          done();
        });
    });

    describe('/GET trackers targets', () => {
        it('should get all the trackers', done => {
            chai.request(server)
                .get('/trackerstargets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                })
                done();
        })
    });

    describe('/POST tracker target',() => {
        it('should post tracker target', done => {
            let tracker = {
                trackerID: trackerID,
                target: target,
                value: value,
                date: Date.now(),
            };
            chai.request(server)
                .post('/trackertargets')
                .send(trackertarget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('TrackerID');
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');

                })
                done();
        })
    });

    describe('/POST wrong trackertarget',() => {
        it('should not post tracker', done => {
            let tracker = {
                trackerID: trackerID,
                target: target,
                value: value,
                date: Date.now(),
            };
            chai.request(server)
                .post('/trackertargets')
                .send(trackertarget)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('err');
                    res.body.should.be.a('object');

                })
                done();
        })
    });

})