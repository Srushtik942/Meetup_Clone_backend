const mongoose = require("mongoose");
require("dotenv").config();

const mogoUri = process.env.MONGODB

const initializeDatabase = async()=>{
    await mongoose.connect(mogoUri).then(()=>{
        console.log("Connected to database!")
    }).catch((error)=> console.log("Error connetcing to db", error));
};

module.exports = {initializeDatabase};