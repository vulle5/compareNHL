import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import { reducers } from "../../store";
import App from "../App";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducers, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

afterEach(cleanup);

test("renders homepage", () => {
  const { getByText } = renderWithRedux(<App />);

  expect(getByText("CompareNHL")).toBeInTheDocument();
});
