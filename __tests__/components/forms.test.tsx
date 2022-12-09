import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddItemForm from "../../components/AddItemForm";
import AddListForm from "../../components/AddListForm";
import { useRouter } from 'next/router'


describe("Tests AddListForm and its functionality", () => {

    it("Should render AddListForm component, its elements (initial value for input should be empty string), and receive prop", () => {
        const addNewList = jest.fn()
        render(<AddListForm addNewList={addNewList}/>)
        
        //Grab elements 
        const formLabel = screen.getByLabelText(/Add a new List/i) //--> irregular expresion 
        const formInputField: HTMLInputElement = screen.getByRole("textbox") 
        const submitListNameBtn = screen.getByRole("button")
        
        //Expect elements to be on the DOM
        expect(formLabel).toBeInTheDocument()
        expect(formInputField.value).toBe("")
        expect(submitListNameBtn).toBeInTheDocument()
    })

    it("Should be able to type on input field and have empty input when button is clicked", async () => {
        const addNewList = jest.fn()
        render(<AddListForm addNewList={addNewList}/>)

        //Type on input field 
        const formInputField: HTMLInputElement = screen.getByRole("textbox", {name: /Add a new List/i}) //Gets element by role and label, useful for multiple inputs
        await userEvent.type(formInputField, 'Groceries')
        expect(formInputField.value).toBe('Groceries')

        //Empty input when clicking on submit button
        const submitListNameBtn: HTMLInputElement = screen.getByRole("button")
        await userEvent.click(submitListNameBtn)
        expect(submitListNameBtn.value).toBe("")
    })

})

describe("Tests AddItemForm and its functionality", () => {

    // const route = jest.mock("next/router", () => ({
    //     useRouter: () => ({
    //         query: {pid: "63891b0734a88e5a2d9977d7"}// you can add all other methods 
    //     })
    // }))

    // it.only("Should render AddListForm component, its elements (initial value for input should be empty string), and receive prop", () => {
    //     const addItem = jest.fn()
    //     render(<AddItemForm addItem={addItem}/>)
    //     //Grab elements 
    //     const formLabel = screen.getByLabelText(/Add a new task/i) //--> irregular expresion 
    //     const formInputField: HTMLInputElement = screen.getByRole("textbox") 
    //     const submitListNameBtn = screen.getByRole("button")
        
    //     //Expect elements to be on the DOM
    //     expect(formLabel).toBeInTheDocument()
    //     expect(formInputField.value).toBe("")
    //     expect(submitListNameBtn).toBeInTheDocument()
    // })
    
})