import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Results from "@/pages/results";

// mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      data: JSON.stringify({
        recipeName: "Lemon Garlic Roasted Chicken",
        cuisineType: "American",
        servings: 4,
        prepTime: 15,
        cookTime: 50,
        totalTime: 65,
        ingredients: [
          "1 whole chicken (about 1.5kg)",
          "2 lemons, sliced",
          "4 cloves of garlic, minced",
          "2 tablespoons olive oil",
          "1 teaspoon dried oregano",
          "1 teaspoon dried thyme",
          "Salt and black pepper to taste",
        ],
        instructions: [
          "Preheat the oven to 200°C (400°F).",
          "Rinse the chicken and pat it dry with paper towels.",
          "In a small bowl, combine the minced garlic, olive oil, dried oregano, dried thyme, salt, and black pepper.",
          "Rub the garlic mixture all over the chicken, including the cavity and under the skin.",
          "Place the lemon slices inside the chicken cavity.",
          "Tie the chicken legs together using kitchen twine.",
          "Place the chicken on a rack in a roasting pan.",
          "Roast the chicken in the preheated oven for about 40-50 minutes or until the internal temperature reaches 165°F.",
          "Remove the chicken from the oven and let it rest for about 10 minutes before carving.",
          "Serve the lemon garlic roasted chicken with your favorite sides and enjoy!",
        ],
        img: "https://assets.bonappetit.com/photos/57ae3e611b33404414975c0d/16:9/w_1280,c_limit/roasted-chicken-thighs-with-lemon-and-oregano.jpg",
      }),
    },
  }),
}));

describe("Results", () => {
  it("should show a recipe name as h2", async () => {
    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const recipeName = screen.getByRole("heading", { name: "Lemon Garlic Roasted Chicken", level: 2 });
    expect(recipeName).toBeInTheDocument();
  });

  it("should show a food image", async () => {
    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const foodImg = await screen.findByAltText("Food Image");
    expect(foodImg).toBeInTheDocument();
  });

  describe("Ingredients", () => {
    it("should display as h2", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const ingredients = screen.getByRole("heading", { name: "Ingredients", level: 2 });
      expect(ingredients).toBeInTheDocument();
    });

    it("should show 7 bullet points", () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const bulletPoints = screen.getAllByRole("presentation");
      expect(bulletPoints.length).toBe(7);
    });
  });

  describe("Instructions", () => {
    it("should display as h2", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const instructions = screen.getByRole("heading", { name: "Instructions", level: 2 });
      expect(instructions).toBeInTheDocument();
    });

    it("should show 10 lists", () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const lists = screen.getAllByTestId("instructions-listitem");
      expect(lists.length).toBe(10);
    });
  });

  describe("Info Table", () => {
    it("should show INFO as table column head", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const info = screen.getByRole("columnheader", { name: "INFO" });
      expect(info).toBeInTheDocument();
    });

    it("should show table row", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const perMeal = screen.getByRole("columnheader", { name: "PER MEAL" });
      expect(perMeal).toBeInTheDocument();
    });

    it("should show Preparing Time as table cell", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const preparingTime = screen.getByRole("cell", { name: "Preparing Time" });
      expect(preparingTime).toBeInTheDocument();
    });

    it("should show 15 as Preparing Time value", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const preparingTime = screen.getByRole("cell", { name: "15" });
      expect(preparingTime).toBeInTheDocument();
    });

    it("should show Cooking Time as table cell", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const cookingTime = screen.getByRole("cell", { name: "Cooking Time" });
      expect(cookingTime).toBeInTheDocument();
    });

    it("should show 50 as Cooking Time value", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const cookingTime = screen.getByRole("cell", { name: "50" });
      expect(cookingTime).toBeInTheDocument();
    });

    it("should show Servings row", async () => {
      render(
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      );

      const servings = screen.getByRole("row", { name: "Servings 4" });
      expect(servings).toBeInTheDocument();
    });
  });
});
