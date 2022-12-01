import mongoose from "mongoose"

const mongoUri: string = process.env.MONGO_URI || ""

const connectMongo = async () => {
  if (mongoUri === "") {
    throw new Error('enviroment variable undefined')
  }
  mongoose.connect(mongoUri).catch((err) => {console.log(err)})
}

export default connectMongo

/*
Second params for connect method (recomendation from mongodb):
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
*/