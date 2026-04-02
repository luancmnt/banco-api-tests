const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { getToken } = require('../helpers/authentication.js')

describe('Transfers', () => {
    describe('POST /transferencias', () => {
        it('Should respond with 201 when the transfer amount is equal to or greater than 10.00', async () => {
            const token = await getToken('julio.lima', '123456')
            
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}` )
                .send({
                    'contaOrigem': '1',
                    'contaDestino': '2',
                    'valor': '11',
                    'token': ""
                })

            expect(response.status).to.equal(201);
        })

        it('Should respond with 422 when the transfer amount is less than 10.00', async () => {
            const token = await getToken('julio.lima', '123456')
            
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}` )
                .send({
                    'contaOrigem': '1',
                    'contaDestino': '2',
                    'valor': '9',
                    'token': ""
                })

            expect(response.status).to.equal(422);
        })
    })
})