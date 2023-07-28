// import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useRouter } from "next/router";
import mockRouter from "next-router-mock";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import QuestForm from ".";

jest.mock("next/router", () => require("next-router-mock"));

describe("next-router-mock", () => {
  it("mocks the useRouter hook", () => {
    mockRouter.push("/initial-path");

    render(
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ChakraProvider>
          <QuestForm />
          {/* <ToastContainer /> */}
        </ChakraProvider>
      </ErrorBoundary>
    );
    expect(screen.getByRole("button")).toHaveText('The current route is: "/initial-path"');
    // Click the button:
    user.click(screen.getByRole("button"));

    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({
      asPath: "/foo?bar=baz",
      pathname: "/foo",
      query: { bar: "baz" },
    });
  });
});

// test("modal pops up when YOLO button is clicked", () => {
//   render(<QuestForm />);
// })
