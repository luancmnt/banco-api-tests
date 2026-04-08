const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { getToken } = require('../helpers/authentication.js')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transfers', () => {
    let token

        beforeEach(async () => {
        token = await getToken('julio.lima', '123456')    
    })

    describe('POST /transferencias', () => {

        it('Should respond with 201 when the transfer amount is equal to or greater than 10.00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}` )
                .send(bodyTransferencias)

            expect(response.status).to.equal(201);
        })

        it('Should respond with 422 when the transfer amount is less than 10.00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7
            
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(response.status).to.equal(422);
        })
    })

     describe('GET /transferencias/{id}', () => {

        it('Should return status 200 and data matching the transfer record in the database when sending a valid ID', async () => {
            const response = await request(process.env.BASE_URL)
            .get('/transferencias/9')
            .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(9)
            expect(response.body.id).to.be.a('number')
            expect(response.body.conta_origem_id).to.equal(1)
            expect(response.body.conta_destino_id).to.equal(2)
            expect(response.body.valor).to.equal(11.00)
        })
     })

     describe('GET /transferencias', () => {
        it ('Should return 10 items when limit is set to 10', async () => {
            const response = await request(process.env.BASE_URL)
            .get('/transferencias?page=1&limit_10')
            .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200)
            expect(response.body.limit).to.equal(10)
            expect(response.body.transferencias).to.have.lengthOf(10)
        })
     }) 
})