const mongoose=require("mongoose")
require("dotenv").config()

const mongoLink=process.env.MONGO_LINK;
console.log(`${mongoLink}/youtube`)
const connectToMongo=async()=>{
    await mongoose.connect(`${mongoLink}/youtube`)
}

module.exports={connectToMongo}