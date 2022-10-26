import mongoose from "mongoose"

const connectMongo = async () =>
  mongoose.connect(process.env.MONGO_URI).catch((err) => {
    console.log(err)
  })

export default connectMongo
