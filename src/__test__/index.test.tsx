import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import QuestForm from "../pages";
import { questions } from "@/data/questions";

jest.mock("next/router", () => require("next-router-mock"));

// Mock the axios.post function
jest.mock("axios", () => ({
  post: jest.fn((url, data) => {
    // Return a mocked response
    return Promise.resolve({
      data: "mock data",
    });
  }),
}));

// Mock the router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const questionNum = questions.length + 1;

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

  it("contains Submit button", () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  it("should be able to change spicy level", async () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );

    const mild = screen.getByLabelText("Mild");
    const medium = screen.getByLabelText("Medium");
    const hot = screen.getByLabelText("Hot");
    const veryHot = screen.getByLabelText("Very Hot");
    const extremely = screen.getByLabelText("Extremely");

    await user.click(mild);
    expect(mild).toBeChecked();
    expect(medium).not.toBeChecked();
    expect(hot).not.toBeChecked();
    expect(veryHot).not.toBeChecked();
    expect(extremely).not.toBeChecked();

    await user.click(veryHot);
    expect(mild).not.toBeChecked();
    expect(medium).not.toBeChecked();
    expect(hot).not.toBeChecked();
    expect(veryHot).toBeChecked();
    expect(extremely).not.toBeChecked();
  });

  it("should be able to change budget currency", async () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );

    const gbp = screen.getByLabelText("GBP");
    const eur = screen.getByLabelText("EUR");
    const usd = screen.getByLabelText("USD");

    await user.click(eur);
    expect(gbp).not.toBeChecked();
    expect(eur).toBeChecked();
    expect(usd).not.toBeChecked();

    await user.click(usd);
    expect(usd).toBeChecked();
    expect(eur).not.toBeChecked();
    expect(gbp).not.toBeChecked();
  });

  it(`contains all ${questionNum} questions once and only once`, () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );

    questions.map((el) => {
      const label = screen.getAllByText(el.label);
      expect(label.length).toBe(1);
    });
  });
});

describe("Modal", () => {
  it("should pop up after SUBMIT button is clicked", async () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    user.click(submitButton);
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("should pop up after YOLO button is clicked", async () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );

    const yoloButton = screen.getByRole("button", { name: "YOLO" });
    user.click(yoloButton);
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();
  });
});
