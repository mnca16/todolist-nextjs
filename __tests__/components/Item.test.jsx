import "@testing-library/jest-dom"
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Item from "../../components/Item";

describe("Tests Items component and functionality", () => {

    it("Shoud render List items", () => {
        const item = {
            _id: "63891b3d34a88e5a2d9977de",
            listId: "63891b0734a88e5a2d9977d7",
            completed: false,
            deleted: false,
            title: "Eggs",
            _v: 0,
        }
    
        const deleteItem = jest.fn()
    
        const handleChangeCheck = jest.fn()

        render(<Item item={item} deleteItem={deleteItem} handleChangeCheck={handleChangeCheck}/>)
        const listItem = screen.getByText("Eggs")
        expect(listItem).toBeInTheDocument()
    })
})