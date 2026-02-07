const {Schema , default : mongoose, model} = require("mongoose")

const Attendance = new Schema({

    // Subject Code
    scode : {
        type : Schema.Types.ObjectId,
        ref: "Subject"
    },

    // User Id
    userid : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    // Present Day
    pday : {
        default : 0,
        type : Number,
        required : true
    },

    // Absent Day
    aday : {
        default : 0,
        type : Number,
        required : true
    },

    // Total Day
    tday : {
        default : 0,
        type : Number,
        required : true
    }

} , {timestamps:true})

module.exports = new model("Attendance" , Attendance)