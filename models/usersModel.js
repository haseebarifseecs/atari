const mongoose = require(`mongoose`);
const validator = require(`validator`);
const { generateHash }  = require(`./encryption/passEncrypt`);

const userModels = new mongoose.Schema({
    name:{
        type:String,
        required:"Name Must Be Specified "
    },
    role:{
        type:String,
        required:"Role Must Be Specified",
        lowercase:true,
    },
    password:{
        type:String,
        set:generateHash,
        required:"Password Cannot be Empty"
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        validate:[validator.isEmail, 'Email format is invalid.'],
        required:"Email Must Be Specified"
    }
})

module.exports = mongoose.model('userModels',userModels);

