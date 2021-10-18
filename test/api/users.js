// packages
import chai from 'chai';
const expect = chai.expect;
import request from 'supertest';
import faker from 'faker';
// modules
import app from '../../app.js';
import conn from '../../db/index.js';

describe('Api testing /api/users', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })

    let randomName = faker.name.findName();
    let randomDistance = faker.datatype.number({'min': 11111, 'max': 99999});
    let randomHours = faker.datatype.number({'min': 111, 'max': 999});
    const user = { _id: "6166e2a4aabc79597b957ff8", name: randomName, distance: randomDistance, hours: randomHours };

    it('Generate boarding pass invitation for user by id', (done) => {
        request(app).post(`/api/users/generateInviteCode/${user._id}`)
            .then((res) => {
                const body = res.body;
                expect('Content-Type', /json/);
                expect(body).to.contain.property('userName');
                expect(body).to.contain.property('code');
                expect(body).to.contain.property('svgCode');
                expect(200, done);
                done();
            })
            .catch((err) => done(err));
    });

    it('Check invitation is valid', (done) => {
        request(app).post(`/api/users/checkInviteCode/Bctws90H`)
            .then((res) => {
                const body = res.body;
                expect('Content-Type', /json/);
                expect(body).to.contain.property('isInvitationValid');
                expect(body).to.contain.property('userName');
                expect(body).to.contain.property('userId');
                expect(200, done);
                done();
            })
            .catch((err) => done(err));
    });
    
    it('Get all users', (done) => {
        request(app)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)
        done();
    });

    it('Get user by id', (done) => {
        request(app)
            .get('/api/users/6166e2a4aabc79597b957ff8')
            .expect(200)
            .end((err, res) => {
                const body = res.body;
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('distance');
                expect(body).to.contain.property('hours');
                done();
            })
    });

    it('Update a user record', (done) => {
        const updateUser = { distance: 555 }
        request(app)
            .put(`/api/users/${user._id}`)
            .send(updateUser)
            .expect(200)
            .end((err, res) => {
                const body = res.body;
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('distance');
                expect(body).to.contain.property('hours');
                done();
            })
    });

    it('Get user record which does not exists', (done) => {
        request(app)
            .get('api/users/6166e2a4aabc79597b957fd7')
            .expect(404)
        done();
    });

    it('Creating a new user', (done) => {
        request(app).post('/api/users')
            .send({ name: randomName, distance: randomDistance, hours: randomHours })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('distance');
                expect(body).to.contain.property('hours');
                done();
            })
            .catch((err) => done(err));
    });

    it('Fail, user requires distance', (done) => {
        request(app).post('/api/users')
            .send({ name: 'Test', hours: 33 })
            .then((res) => {
                const body = res.status;
                expect(body).to.equal(500)
                done();
            })
            .catch((err) => done(err));
    });
})