'use strict';

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true}
});

productsSchema.pre('save', function(next) {
    this.category = this.category.toUpperCase();
    next();
});


class Products {

    constructor() {
    }

    get(_id) {
        let request = _id ? {_id} : {};
        return product.find(request);
    }

    post(entry) {
        let newProduct = new product(entry);
        return Promise.resolve(newProduct.save());
    }

    put(_id, entry) {
        return product.findOneAndUpdate(_id, entry, {new: true});
    }

    delete(_id) {
        return product.findOneAndDelete(_id);
    }

}

module.exports = Products;