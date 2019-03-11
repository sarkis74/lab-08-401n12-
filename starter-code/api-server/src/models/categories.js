'use strict';

const uuid = require('uuid/v4');

const categoriesSchema = {// The schema here is requiring id and name
    id: {required: true},
    name: {required: true}
};

class Categories {

    constructor() {
        this.database = [];// Instance of db for modeling
    }

    get(_id) {
        let result = this.database.filter( record => record.id === _id);// If there's an id we will search the db to see if it matches anything
        return Promise.resolve(result[0]);
    }

    post(record) {
        record.id = uuid();// Post doesn't have id so we add one to each entry
        let newCategory = this.sanitize(record);
        if (newCategory.id) {this.database.push(newCategory)}
        return Promise.resolve(newCategory);
    }

    put(_id, record) {
        record.id = _id;
        let entry = this.sanitize(record);
        if(entry.id) {// If record sanitized add to db
            this.database = this.database.map( item => (item.id === _id) ? record : item);
        }
        return Promise.resolve(record);
    }

    delete(_id) {
        let index;
        for(let i = 0; i < this.database.length; i++) {
            if(this.database[i].id === _id) index = i;
        }
        this.database.splice(index, 1);
        return Promise.resolve();
    }

    sanitize(entry) {// This method is to make sure entries follow schema format
        let valid = true;// Boolean for checking entries
        let record = {};
        for(let key in categoriesSchema) {
            if(categoriesSchema[key].required) {// If there's a key that's required(== true)
                if(entry[key]) {// If there's an entry object key
                    record[key] = entry[key];
                }
                else {
                    valid = false;
                }
            }
            else {
                record[key] = entry[key];
            }

        }
        return valid ? record : undefined;// If valid true then record
    }
}

module.exports = Categories;