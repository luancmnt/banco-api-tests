const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { getToken } = require('../helpers/authentication.js')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transfers', () => {
    describe('POST /transferencias', () => {
        let token

        beforeEach( async () => {
            token = await getToken('julio.lima', '123456')    
        })

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
                .set('Authorization', `Bearer ${token}` )
                .send(bodyTransferencias)

            expect(response.status).to.equal(422);
        })
    })
})