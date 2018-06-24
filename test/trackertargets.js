let models = require('../models'); 
let chai = require('chai'); 
let chaiHttp = require('chai-http'); 
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Tracker targets', () => {
    beforeEach(done => {
        models.TrackerTarget.remove({}, err => {
            done();
        })
    });


    describe('/GET tracker targets', () => {
        it('should get all the tracker targets', done => {
            chai.request(server)
                .get('/trackertargets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                });
                done();
        })
    })


})