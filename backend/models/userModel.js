var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{ type: String, required: true},
    email:{ type: String, required: true , unique: true, dropDups: true},
    password:{ type: String, required: true},
    contact: {type: Number, required: true},
    isAdmin:{ type: Boolean, required:true, default: false},
    
})

const userModel = mongoose.model("User", userSchema)

module.exports= userModel;