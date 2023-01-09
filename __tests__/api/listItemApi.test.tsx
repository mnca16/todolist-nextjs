/**
 * @jest-environment node
 */
import { createMocks } from 'node-mocks-http';
var httpMocks = require("node-mocks-http")
import { memoryServerConnect, memoryServerStop } from '../../lib/connectMemoryServer';
import addItem from "../../pages/api/listItems/addItem";
import getItems from "../../pages/api/listItems/getItems"
import deleteItem from "../../pages/api/listItems/deleteItem/[deleteItemID]"
import completeItem from "../../pages/api/listItems/completeItem/[completeItemID]"


beforeAll(async () => {
  await memoryServerConnect()
});

afterAll(async () => {
  await memoryServerStop()
})


describe('ListItems API addItem handler', () => {

  test('returns 200 status and added list item object', async () => {
    const { req, res } = createMocks({
      method: 'POST',
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
      method: 'POST',
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


describe("ListItems API getItems handler", () => {
  //This test does not pass if I tested in isolation, I think I'll have to add the elements first
  //If I test the file the test would pass because I'm deleting the item I'm adding with the addItem api 
  //Which is apples 
  test('returns 200 status and array of objects', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });
  
    await getItems(req, res);
    
    console.log("response", JSON.parse(res._getData()).lists)
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).lists).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "__v": 0,
          "completed": false,
          "deleted": false,
          "title": "apples",
        })
      ])
    );
  });

  //This api needs to test for error handling but I don't know how to get the error becuause is an internal server error 
  
})

describe.only("ListItems API deleItem handler", () => {

  test("api retuns 200 response and soft deletes a list item", async () => {
   //adds an item  
   const req_1 = httpMocks.createRequest({
      method: "POST",
      body: {
        title: 'apples',
        listId: "6398ec5a91e9601999b8cf06"
      }
    })

   const res_1 = httpMocks.createResponse()
   await addItem(req_1, res_1)

   //stores list item's id and list item's object
   console.log("response", JSON.parse(res_1._getData()).listsItems._id)
   let listItemId = JSON.parse(res_1._getData()).listsItems._id
   console.log("response list id", listItemId)
   let listItemObject = JSON.parse(res_1._getData()).listsItems
   console.log("response list object", listItemObject)
  
   //Soft delete list
   const req_2 = httpMocks.createRequest({
     method: "PATCH",
     body: {deleted: true},
     query: {deleteItemID: listItemId}
   })

   const res_2 = httpMocks.createResponse()

   await deleteItem(req_2, res_2);
      
   expect(res_2._getStatusCode()).toBe(200)
   expect(JSON.parse(res_2._getData()).deletedItem).toEqual(
   expect.objectContaining({
      "__v": 0,
      "deleted": true,
      "title": "apples",
      "listId": "6398ec5a91e9601999b8cf06"
    }))
  })

  test("api returns 500 response and error message", async () => {
    const { req, res } = createMocks({
      method: "PATCH",
      body: { 
        deleted: true,
      },
      query: {
        deleteItemID: ""
      }
    });

    await deleteItem(req, res);
        
    expect(res._getStatusCode()).toBe(500)
    expect(JSON.parse(res._getData())).toEqual(
     expect.objectContaining(
       {
        message: "Item not found"
       }
      )
    )
  })
})

describe("ListItems API complete handler", () => {

})
describe("ListItems API getItems handler", () => {})

describe("ListItems API deleItem handler", () => {})

describe("ListItems API complete handler", () => {})

