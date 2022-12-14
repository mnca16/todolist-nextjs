/**
 * @jest-environment node
 */
import { createMocks } from 'node-mocks-http';
import { memoryServerConnect, memoryServerStop } from '../../lib/connectMemoryServer';
import addItem from "../../pages/api/listItems/addItem";
import getItems from "../../pages/api/listItems/getItems"
import deleteItem from "../../pages/api/listItems/deleteItem/[deleteItemID]"
import completeItem from "../../pages/api/listItems/completeItem/[completeItemID]"

//let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  await memoryServerConnect()
});

afterAll(async () => {
  await memoryServerStop()
})


describe('ListItems API addItem handler', () => {

  test('returns 200 status and added list item object', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      body: {
        title: 'apples',
        listId: "6398ec5a91e9601999b8cf06"
      },
    });
  
    await addItem(req, res);
  
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).listsItems).toEqual(
      expect.objectContaining({
        "completed": false,
        "deleted": false,
        "title": "apples",
        "__v": 0,  
      }),
    );
  });

  test('returns 500 status and error message', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      body: {
        title: '',
        listId: ''
      },
    });
    
    await addItem(req, res);
    
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ 
        message: "Item title or list-id not found"
      }),
    );
  });
});


describe("ListItems API getItems handler", () => {})

describe("ListItems API deleItem handler", () => {})

describe("ListItems API complete handler", () => {})

