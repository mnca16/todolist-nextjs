import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer
let uri

export const memoryServerConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  uri =  mongoServer.getUri();
  console.log("uri",  process.env.MONGO_URI)
  process.env.MONGO_URI = uri
  console.log("uri 2",  process.env.MONGO_URI)
}

export const memoryServerStop = async () => {
  await mongoServer.stop()
}
