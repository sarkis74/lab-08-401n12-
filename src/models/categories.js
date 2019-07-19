'use strict';

const uuid = require('uuid/v4');

const schema = {
    id: {required: true},
    name: {required: true}
};

class Categories {

    constructor() {
        this.database = [];
    }

    get(_id) {
        let result = this.database.filter( record => record.id === _id);
        return Promise.resolve(result[0]);
    }

    post(record) {
        record.id = uuid();
        let newCategory = this.verify(record);
        if (newCategory.id) {this.database.push(newCategory)}
        return Promise.resolve(newCategory);
    }

    put(_id, record) {
        record.id = _id;
        let entry = this.verify(record);
        if(entry.id) {
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

    verify(entry) {
        let valid = true;
        let record = {};

        Object.keys(schema).forEach( key => {
            if(schema[key].required) {
                if(entry[key]) {
                    record[key] = entry[key];
                } else {
                    valid = false;
                }
            } else {
                record[key] = entry[key];
            }
        });

        return valid ? record : undefined;
    }
}

module.exports = Categories;