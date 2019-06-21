const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


let UserSchema = new Schema({
    email:{
        required:true,
        type:String
    },
    verify:{
        type:String,
        required:true
    },
    active:{
        default:false
    }
})

mongoose.model('User', UserSchema);