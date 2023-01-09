import { findByText, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { rest } from "msw" // mockig rest?
import { setupServer } from "msw/node" // sets up the mock server 
import HomePage from "../../pages/index"

//Data passed to homePage component
const lists = [
  {
    _id: 1,
    deleted: false,
    name: "test 1",
  },
  {
    _id: 2,
    deleted: false,
    name: "list 2",
  },
]

//sets up userEvent and stores in a variable as an instance to be reusable 
const user = userEvent.setup()

describe("Test HomePage Component", () => {

  describe("Test page load", () => {
    it("Should display all the lists given on HomePage", () => {
      render(<HomePage listsName={lists} />)
      for (const i of lists) {
        expect(screen.getByText(i.name)).toBeInTheDocument()
      }
    })
  })

  describe("Creates a new list", () => {
    it("adds a new list", async () => {
      const newListName = "new list-test"

      //Sets up server to mock fetch request on front-end using msw
      const server = setupServer(
        rest.post("/api/lists/addList", async (req, res, ctx) => {
          const { name } = await req.json()
          console.log("name", name)
          return res(
            ctx.json({
              lists: {
                name: newListName,
                deleted: false,
                _id: "3",
            }
            })
          )
        })
      )
      
      server.listen() 
      render(<HomePage listsName={lists} />)
      //Grabs form's elements
      const addListInput = screen.getByRole('textbox', { name: /add a new list/i })
      expect(addListInput).toBeInTheDocument()


      const addListBtn = screen.getByRole('button', { name: /add list name/i })
      //const addListBtn = screen.getByRole('button', { name: /add list name/i })[0]
      // console.log("ADD LIST BUTTON", addListBtn.length)
      expect(addListBtn).toBeInTheDocument()

      //Type in new title
      await user.clear(addListInput)
      expect(addListInput.value).toBe("")
      await user.type(addListInput, newListName)
      expect(addListInput.value).toBe(newListName)

      //Submit form
      await user.click(addListBtn)

      //Asserts new list on homePage component
      expect(await screen.findByText(newListName)).toBeInTheDocument()

      server.close()
    })
  })

  describe("Shows server error",() => {
    const testErrorMessage = "This is a test failure"
    test("retutns error server if request fails", async () => {
      const server = setupServer(
        rest.post("/api/lists/addLis", async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({message: testErrorMessage}))
        })
      )

      server.listen()
      render(<HomePage listsName={lists} />)
      // userEvent.click(screen.getByRole('button', { name: /add list name/i }))
 
      // await waitFor( () => {
      //   expect(screen.findByRole('alert')).toHaveTextContent(testErrorMessage), { timeout: 8000 }
      // }, 10000)
      
      server.close()
    })
  })
  
  describe("Deletes List", () => {
   
    it("deletes list", async () => {

      //Sets up server to mock fetch request on front-end using msw
      const server = setupServer(
        rest.patch("/api/lists/1", async (req, res, ctx) => {
          console.log("req from set up server", req.text())
          const { deleteID } = req.params
          console.log("deleteID", deleteID)
          console.log("res from server", res(ctx.body()))
          return res(
            ctx.json({
              deletedList: {
                deleted: true,
                name: "test 1",
                _v: 0,
                _id: "1",
            }
            })
          )
        })
      )
      
      server.listen()
      render(<HomePage listsName={lists} />)

      //Grabs list element and expects to be on the document
      const listElement = screen.getByText("test 1")
      expect(listElement).toBeInTheDocument()
      
      //Make sure the list and delete btn are on the document 
      const deleteBtn = screen.getAllByRole("button", { name: /delete-list/i })
      expect(deleteBtn.length).toBe(2)
      
      //Grabs list item button I want to delete 
      const deleteBtn1 = screen.getAllByRole("button", { name: /delete-list/i })[0]
    
      //User attemps to delete list 
      await user.click(deleteBtn1)

      
      waitFor(async () => {
        expect(await screen.findByText("test 1")).not.toBeInTheDocument()
      })
      

      

      server.close()
    })
  })

})
