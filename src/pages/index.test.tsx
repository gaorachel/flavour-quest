import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import QuestForm from ".";
import { matchMediaMock } from "../../mocks/matchMediaMock";

jest.mock("next/router", () => require("next-router-mock"));

describe("QuestForm", () => {
  it("contains YOLO button", () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );
    const yoloButton = screen.getByRole("button", { name: "YOLO" });
    expect(yoloButton).toBeInTheDocument();
  });
});
