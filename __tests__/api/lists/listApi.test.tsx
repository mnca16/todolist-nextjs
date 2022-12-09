/**
 * @jest-environment node
 */
import { createMocks } from 'node-mocks-http';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import addList from "../../../pages/api/lists/addList";
import deleteList from "../../../pages/api/lists/[deleteListID]"

describe("Lists API test addList handler", () => {
    let con: MongoClient;
    let mongoServer: MongoMemoryServer;
    
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        con = await MongoClient.connect(mongoServer.getUri(), {});
    });

    test("api gets response status 200 and returns new list object", async () => {
        const { req, res } = createMocks({
            method: "POST",
            body: { 
              name: 'Groceries' 
            } 
        });

        await addList(req, res);

        expect(res._getStatusCode()).toBe(200)
        expect(JSON.parse(res._getData()).lists).toEqual(
            expect.objectContaining(
            {
                "__v": 0, 
                "deleted": false, 
                "name": "Groceries" 
            }
            )
        )
    })

    test("api gets response 400 and error message", async () => {
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
            )
        )
    })


})
