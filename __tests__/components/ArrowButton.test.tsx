import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react'
import ArrowButton from "../../components/ArrowButton"
//import userEvent from '@testing-library/user-event'
//import { useRouter } from "next/router"
//import Link from 'next/link';

// jest.mock("next/router", () => ({
//     useRouter: jest.fn()
// }));

//jest.mock('next/link', () => ({ children }: { children: JSX.Element }) => children);

describe("Arrow Button", () => {
    it("Should render ArrowButton componet", () => {
        render(<ArrowButton/>)
        const arrowBtn = screen.getByRole("button")
        expect(arrowBtn).toBeInTheDocument()
    })


    // it("Should go back to Home Page when button is clicked", async () => {
    //     render(<ArrowButton/>)

    //     const push = jest.fn();

    //  //(useRouter as jest.Mock).mockImplementation(() => ({ push}));
        
    //  //    const mockRouter = {
    //  //     push: jest.fn()
    //  //   }
      
    //  //   ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    //     // const arrowBtn = screen.getByRole("button")
    //     // userEvent.click(arrowBtn)
    //     // expect(push).toHaveBeenCalledWith("/")
      
    //     const arrowBtn = screen.getByTestId("btn")
    //     userEvent.click(arrowBtn)
    //     expect(arrowBtn.closest('Link')).toHaveAttribute('href', 'https://');
    // })
})

