import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { ChannelOpen } from "../index";
import store from "../../../providers/Store";

it("should submit a form to open a channel", async () => {
  render(
    <Provider store={store}>
      <ChannelOpen walletBalance={1000000} />
    </Provider>
  );

  userEvent.type(
    screen.getByPlaceholderText(
      "02a4ee943caeb847398960230bccc19937dd04834e768472b711a4ce0e2c77cd98"
    ),
    "100000"
  );
  userEvent.type(
    screen.getByPlaceholderText(
      "g4xc7yl2shtllx564dv7wqelnqh2gjco6k5vd77upz3rgzozugpkmkad.onion:9735"
    ),
    "192.168.0.100:9735"
  );

  userEvent.click(screen.getByRole("button", { name: "Open channel" }));

  await waitFor(() =>
    expect(screen.getByText(/Channel opened!/i)).toBeInTheDOM()
  );
});
