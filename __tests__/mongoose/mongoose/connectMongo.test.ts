const {MongoClient} = require('mongodb')
import mongoose from "mongoose"

describe("Connects and catch error on the data base", () => {
    const databaseName = "monica"
    let connection;
    let db: { collection: (arg0: string) => any; };

    beforeAll(async () => {
        const url : string = process.env.MONGO_URI || ""
        // await connectMongo()
        //connection = await MongoClient.connect(globalThis.process.env.MONGO_URI
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
         // );
        //db = await connection.db(globalThis.process.env.MONGO_URI);
        await mongoose.connect(url)
    })

    it('should insert a doc into collection', async () => {
        const list = db.collection(databaseName);
    
        const mockList = {_id: 'some-user-id', name: 'Todo'};
        await list.insertOne(mockList);
    
        const insertedList = await list.findOne({_id: 'some-user-id'});
        expect(insertedList).toEqual(mockList);
      });
})