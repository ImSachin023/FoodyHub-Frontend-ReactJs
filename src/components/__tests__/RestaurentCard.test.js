import { render, screen } from "@testing-library/react"
import RestaurantCard from "../RestaurentCard"
import MOCK_DATA from "../mocks/resCardMock.json"
import "@testing-library/jest-dom"


it("should be render restaurent card component with props",()=>{
    render(<RestaurantCard resData={MOCK_DATA}/>);

    const nameId = screen.getByText("Pizza Hut");


    expect(nameId).toBeInTheDocument()
})