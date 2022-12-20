import mongoose from "mongoose"

const connectMongo = async () => {
  const mongoUri: string | undefined = process.env.MONGO_URI 

  if (!mongoUri) {
    throw new Error('enviroment variable undefined')
  }

  await mongoose.connect(mongoUri).catch((err) => {console.log("DB connect error",err)})
}

export default connectMongo
