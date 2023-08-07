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
  it("should have a recipe name as heading", async () => {
    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const recipeName = screen.getByRole("heading", { name: "Lemon Garlic Roasted Chicken" });
    expect(recipeName).toBeInTheDocument();
  });

  it("should have a food image", async () => {
    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const foodImg = await screen.findByAltText("Food Image");
    expect(foodImg).toBeInTheDocument();
  });
});
