import "@testing-library/jest-dom"
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Lists from "../../components/Lists";
import ListItems from "../../components/ListItems";


describe("Tests Lists component", () => {
    it("Should render Lists component", () => {
       const list = [{
          _id: "63891b0734a88e5a2d9977d7",
          deleted: false,
          name: "Groceries",
          _v: 0,
       }]

       const deleteList = jest.fn()
       render(<Lists list={list} deleteList={deleteList}/>)
       expect(screen.getByText("Groceries")).toBeInTheDocument()
    })
})


describe("Tests ListItems component", () => {
    it("Should render Lists component", () => {
       const listItems = [{
        _id: "63891b3d34a88e5a2d9977de",
        listId: "63891b0734a88e5a2d9977d7",
        completed: false,
        deleted: false,
        title: "Eggs",
        _v: 0,
       }]

       const deleteItem = jest.fn()

       const handleChangeCheck = jest.fn()

       render(<ListItems listItems={listItems} deleteItem={deleteItem} handleChangeCheck={handleChangeCheck}/>)
       expect(screen.getByText("Eggs")).toBeInTheDocument()
    })
})