const {Schema , default : mongoose, model} = require("mongoose")

const Subject = new Schema({

    // User id
    userid : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
        
    // Subject Name
    sname : {
        type : String,
        required : true,
    },

    // Subject Code
    scode : {
        type : String,
        required : true,
        unique : true
    },

    // Subject Credit
    credit : {
        type : Number,
        required : true,
    },

    // Faculty Name
    facultyname : {
        type : String,
    }
} , {timestamps:true})

module.exports = new model('Subject' , Subject)