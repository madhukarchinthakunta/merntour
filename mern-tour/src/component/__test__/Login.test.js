import {screen,render} from "@testing-library/react"
import Login from "../../pages/Login"

describe("Test the Login Component",()=>{
    test('render LOgin page ', async() => {
        render(<Login />)
        const buttonList= await screen.findAllByRole("button")
        expect(buttonList).toHaveLength(2)
      
    })
    
})