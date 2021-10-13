const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
        },
        distance : {
            type : Number,
            required : true,
        },
        hours : {
            type : Number,
            required : true,
        },
        accessCode : {
            type : String,
            required : false,
        },
        isCodeValid : {
            type : Boolean,
            required : false,
        },
    },
    { 
        timestamps : true 
    } 
);

const User = mongoose.model('User', userSchema);

module.exports = User;