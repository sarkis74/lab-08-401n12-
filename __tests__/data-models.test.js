'use strict';

const {server} = require('../src/app');
const supertest = require('supertest');
const mockRequest = supertest(server);
const supergoose = require('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('tests for all data models', () => {

    it('can post a category', () => {
        return mockRequest
            .post('/categories')
            .send({name: 'sporting goods'})
            .then( result => {
                expect(result.body.name).toBe('sporting goods');
                expect(result.status).toBe(200);
            });
    });

    it('can get a specific category', () => {
        return mockRequest
            .post('/categories')
            .send({name: 'sporting goods'})
            .then( result1 => {
                return mockRequest
                    .post('/categories')
                    .send({name: 'sporting goods'})
                    .then(result2 => {
                        return mockRequest
                            .get(`/categories/${result2.body.id}`)
                            .then( data => {
                                expect(data.body[0].name).toBe('sporting goods');
                                expect(data.status).toBe(200);
                            });
                    });
            });
    });

    it('can GET all categories', () => {
        return mockRequest
            .post('/categories')
            .send({name: 'sporting goods'})
            .then( data1 => {
                return mockRequest
                    .post('/categories')
                    .send({name: 'furniture'})
                    .then(data2 => {
                        return mockRequest
                            .get('/categories')
                            .then( result => {
                                expect(result.body.count).toBe(5);
                                expect(result.body.results[3].name).toBe('sporting goods');
                                expect(result.body.results[4].name).toBe('furniture');
                            });
                    });
            });
    });

    it('can PUT new info in an existing category', () => {
        return mockRequest
            .post('/categories')
            .send({name: 'sporting goods'})
            .then( data => {
                return mockRequest
                    .put(`/categories/${data.body.id}`)
                    .send({name: 'furniture'})
                    .then( result => {
                        expect(result.body.name).toBe('furniture');
                        expect(result.body.id).toBe(data.body.id);
                        expect(result.status).toBe(200);
                    });
            });
    });

    it('can DELETE an existing category', () => {
        return mockRequest
            .post('/categories')
            .send({name: 'sporting goods'})
            .then( data => {
                return mockRequest
                    .delete(`/categories/${data.body.id}`)
                    .then(result => {
                        expect(result.status).toBe(200);
                    });
            });
    });

    it('can POST a product', () => {
        return mockRequest
            .post('/products')
            .send({name: 'soccer ball', category: 'sporting goods'})
            .then( result => {
                expect(result.body.name).toBe('soccer ball');
                expect(result.body.category).toBe('sporting goods');
                expect(result.status).toBe(200);
            });
    });

    it('can GET a specific product', () => {
        return mockRequest
            .post('/products')
            .send({name: 'baseball glove', category: 'sporting goods'})
            .then( data1 => {
                return mockRequest
                    .post('/products')
                    .send({name: 'couch', category: 'furniture'})
                    .then( data2 => {
                        return mockRequest
                            .get(`/products/${data1.body._id}`)
                            .then( result => {
                                expect(result.body.name).toBe('couch');
                                expect(result.body.category).toBe('sporting goods');
                                expect(result.status).toBe(200);
                            });
                    });
            });
    });

    it('can GET all products', () => {
        return mockRequest
            .post('/products')
            .send({name:'baseball glove', category:'sporting goods'})
            .then( data1 => {
                return mockRequest
                    .post('/products')
                    .send({name:'couch', category:'furniture'})
                    .then( data2 => {
                        return mockRequest
                            .get('/products')
                            .then( result => {
                                expect(result.body.count).toBe(5);
                                expect(result.body.results[3].name).toBe('baseball glove');
                                expect(result.body.results[4].name).toBe('couch');
                                expect(result.status).toBe(200);
                            });
                    });
            });
    });

    it('can PUT new info in an existing product', () => {
        return mockRequest
            .post('/products')
            .send({name:'soccer ball', category:'sporting goods'})
            .then( data => {
                return mockRequest
                    .put(`/products/${data.body._id}`)
                    .send({name:'soccer ball', category:'sporting goods'})
                    .then( result => {
                        expect(result.body.name).toBe('puck');
                        expect(result.body.category).toBe('sporting goods');
                        expect(result.status).toBe(200);
                    });
            });
    });

    it('can DELETE an existing product', () => {
        return mockRequest
            .post('/products')
            .send({name:'soccer ball', category:'sporting goods'})
            .then( data => {
                return mockRequest
                    .delete(`/products/${data.body._id}`)
                    .then( result => {
                        expect(result.status).toBe(200);
                    });
            });
    });

    it('can throw and ERROR with a bad object', () => {
        return mockRequest
            .post('/categories')
            .send({type:'not valid'})
            .then( result => {
                expect(result.status).toBe(500);
            });
    });

    it('can send a 404 on a bad route', () => {
        return mockRequest
            .get('/category')
            .then( result => {
                expect(result.status).toBe(404);
            });
    });

});