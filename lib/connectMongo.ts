import mongoose from "mongoose"

const mongoUri: string = process.env.MONGO_URI || ""

//add an if statement

const connectMongo = async () =>
  mongoose.connect(mongoUri).catch((err) => {
    console.log(err)
  })

export default connectMongo

/*
Second params for connect method (recomendation from mongodb):
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
*/