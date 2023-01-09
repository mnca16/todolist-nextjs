/**
 * @jest-environment node
 */
import { createMocks} from 'node-mocks-http';
import { memoryServerConnect, memoryServerStop } from '../../lib/connectMemoryServer';
var httpMocks = require("node-mocks-http")
import addList from "../../pages/api/lists/addList";
import deleteList from "../../pages/api/lists/[deleteListID]"


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

    //Expect assertions
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
    
  test("api returns response 200 and deleted list object", async () => {
    //creates list   
    const req_1 = httpMocks.createRequest({
      method: "POST",
      body: {name: "Work"}
    })

    const res_1 = httpMocks.createResponse()
    await addList(req_1, res_1)

    //stores list's id and list object
    console.log("response", res_1)
    let listId = JSON.parse(res_1._getData()).lists._id
    console.log("response list id", listId)
    let listObject = JSON.parse(res_1._getData()).lists
    console.log("response list object", listObject)
    

    //Soft delete list
    const req_2 = httpMocks.createRequest({
      method: "PATCH",
      body: {deleted: true},
      query: {deleteListID: listId}
    })

    const res_2 = httpMocks.createResponse()


    await deleteList(req_2, res_2);
        
    expect(res_2._getStatusCode()).toBe(200)
    expect(JSON.parse(res_2._getData()).deletedList).toEqual(
     expect.objectContaining(
      {
        "__v": 0,
        "deleted": true,
        "name": "Work",
      }
      )
    )
  })

  test("api returns response 500 and error message", async () => {
        
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