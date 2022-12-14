/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from 'node-mocks-http';
import { MongoClient, ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import addList from "../../pages/api/lists/addList";
import deleteList from "../../pages/api/lists/[deleteListID]"
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer
let uri

export const memoryServerConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  uri =  mongoServer.getUri();
  process.env.MONGO_URI = uri
  await mongoose.connect(uri);
}

export const memoryServerStop = async () => {
  await mongoServer.stop()
}


beforeAll(async () => {
  await memoryServerConnect()
});

afterAll(async () => {
  await memoryServerStop()
})



describe("Lists API test addList handler", () => {

  test("api returns response status 200 and returns new list object", async () => {
    //create mocks 
    const { req, res } = createMocks({
      method: "POST",
      body: { 
        name: 'Groceries' 
      } 
    });
    //use handler 
    await addList(req, res);
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).lists).toEqual(
      expect.objectContaining(
        {
          "__v": 0, 
          "deleted": false, 
          "name": "Groceries" 
        }
    ))
  })

  test("api returns response 400 and error message", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { 
        name: ""
      } 
    });

    await addList(req, res);

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(
        {
          message: "List name not found"
        }
    ))
  })
})

describe("Lists API test deleteList handler", () => {
    
  test.only("api returns response 200 and deleted list object", async () => {
        
    const { req, res } = createMocks({
      method: "PATCH",
      body: { 
        deleted: true,
      },
      query: {
        deleteListID: "6398ec5a91e9601999b8cf06"
      }
    });

    await deleteList(req, res);
        
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).deletedList).toEqual(
     expect.objectContaining(
       {
        //  "deletedList" : {
           "deleted": true,
           "name": "List 4",
           "_v": 0,
           "_id": '6398ec5a91e9601999b8cf06' 
         // }
       }
      )
    )
  })

  test.only("api returns response 500 and error message", async () => {
        
    const { req, res } = createMocks({
      method: "PATCH",
      body: { 
        deleted: true,
      },
      query: {
        deleteListID: ""
      }
    });

    await deleteList(req, res);
        
    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual(
     expect.objectContaining(
       {
        message: "List not found"
       }
      )
    )
  })


})