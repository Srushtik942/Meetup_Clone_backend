const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventType:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    eventName: {
        type:String,
        required: true
    },
    meetImage:{
        type:String,
        required: true
    },
    host:{
        type:String,
        required: true
    },
    details:{
        type:String,
        required: true
    },
    dressCode:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    tags:[{
        type:String,
        enum: ["Marketing", "Digital", "Designing", "ReactJs","NodeJs"]
    }]
},
{
    timestamps: true
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;