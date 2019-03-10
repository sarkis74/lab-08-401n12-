'use strict';

const uuid = require('uuid/v4');// Unique ids

const schema = {// Schema here is requiring id and name
    id: {required: true},
    name: {required: true}
};

class Products {

    constructor() {
        this.database = [];// Instance of db for modeling
    }

    get(id) {
        let result = id ? this.database.filter(record => record.id == id) : this.database;// If there's an id we will search the db to see if it matches anything
        return result;
    }

    post(entry) {
        entry.id = uuid();// Post doesn't have id so we add one to each entry
        let record = this.sanitize(entry);
        if(record.id) { this.database.push(record) };// If record sanitized add to db
        return record;
    }

    put(id, entry) {
    }

    delete(id) {
    }

    sanitize(entry) {// This method is to make sure entries follow schema format
        let valid = true;// Boolean for checking entries
        let record = {};
        for(let key in schema) {
            if(schema[key].required) {// If there's a key that's required(== true)
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

module.exports = Products;