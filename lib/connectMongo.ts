import mongoose from "mongoose"

const connectMongo = async () => {
  const mongoUri: string | undefined = process.env.MONGO_URI 
  console.log("process", mongoUri)
  if (!mongoUri) {
    throw new Error('enviroment variable undefined')
  }
  mongoose.set('debug', true)
  await mongoose.connect(mongoUri).catch((err) => {console.log("DB connect error",err)})
}

export default connectMongo
