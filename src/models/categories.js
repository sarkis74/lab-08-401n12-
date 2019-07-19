'use strict';

const mongoose = require('mongoose');

// mongoose schema
const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true}
});

// pre-hook attached to mongoose schema
productSchema.pre('save', function(next) {
    this.category = this.category.toUpperCase();
    next();
});

// integrate schema into model
const product = mongoose.model('product', productSchema);

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