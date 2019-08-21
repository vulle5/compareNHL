import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithRedux } from "../../functions/renderWithRedux";

import App from "../App";

afterEach(cleanup);

test("renders homepage", () => {
  const { getByTestId } = renderWithRedux(<App />);

  expect(getByTestId("foundation")).toBeInTheDocument();
});
