var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{ type: String, },
    image:{ type: String},
    brand:{ type: String},
    price:{ type: Number, default: 0},
    category:{ type: String},
    countInStock:{ type: Number, default: 0, },
    description:{ type: String},
    rating:{ type: Number, default: 0, },
    numReviews :{ type: Number, default: 0, },
    
    
})

const productModel = mongoose.model("Product", productSchema)

module.exports= productModel;