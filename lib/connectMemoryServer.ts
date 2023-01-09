import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from "mongodb"



let mongoServer: any = MongoMemoryServer
let uri, connect: any  

export const memoryServerConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  uri =  mongoServer.getUri();
  console.log("uri",  process.env.MONGO_URI)
  process.env.MONGO_URI = uri
  console.log("uri 2",  process.env.MONGO_URI)
  connect = await MongoClient.connect(uri, {})
}

export const memoryServerStop = async () => {
  if (connect) {
    await connect.close()
  } if (mongoServer) {
  await mongoServer.stop()
  }
}
