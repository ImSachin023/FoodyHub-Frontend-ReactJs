import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react"
import RestaurentMenu from "../RestaurentMenu.js"
import MOCK_DATA from "../mocks/mockresMenu.json"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore.js"
import Header from "../Header.js"
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom"
import Cart from "../Cart.js"

global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => {
        return Promise.resolve(MOCK_DATA);
      },
    });
  });


it("should load restaurent menu Component ",async ()=>{
    await act(async ()=> render(
        <BrowserRouter>
    <Provider store={appStore}>
        <Header/>
        <RestaurentMenu/>
        <Cart/>
        </Provider>
        </BrowserRouter>
        ))

    const accordianHeader = screen.getByText("Drinks (9)")
    fireEvent.click(accordianHeader)

        expect(screen.getAllByTestId("foodItems").length).toBe(9)

      expect(screen.getByText("Cart(0 ITEM)")).toBeInTheDocument()


      const addBtns = screen.getAllByRole("button",{name:"ADD"})
      fireEvent.click(addBtns[0]) 
      
      expect(screen.getByText("Cart(1 ITEM)")).toBeInTheDocument()

      fireEvent.click(addBtns[1]) 

      expect(screen.getByText("Cart(2 ITEM)")).toBeInTheDocument()

      expect(screen.getAllByTestId("foodItems").length).toBe(11)

      fireEvent.click(screen.getByRole("button",{name:"ClearCart"} ))

        expect(screen.getAllByTestId("foodItems").length).toBe(9)
      
      expect(screen.getByText("Cart is empty,Please add some items")).toBeInTheDocument()

})