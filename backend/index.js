const express = require("express");
const axios = require("axios");
const { askGPT } = require("./openai");

const app = express();
app.use(express.json());

const url = "/api/v1/quest";

const resFormat = {
  recipeName: "Spaghetti Carbonara",
  cuisineType: "Italian",
  servings: 2,
  prepTime: 10,
  cookTime: 15,
  totalTime: 25,
  ingredients: [
    "200g spaghetti",
    "100g pancetta",
    "2 cloves of garlic",
    "2 large eggs",
    "50g grated Parmesan cheese",
    "Salt and black pepper to taste",
  ],
  instructions: [
    "Bring a large pot of salted water to a boil and cook spaghetti according to package instructions until al dente.",
    "Meanwhile, in a large skillet, fry pancetta until crispy. Remove from heat and set aside.",
    "In a separate bowl, whisk together eggs, grated Parmesan cheese, salt, and black pepper.",
    "Once spaghetti is cooked, drain it and quickly toss it in the skillet with the pancetta. Remove from heat.",
    "Pour the egg mixture over the hot spaghetti while stirring continuously, allowing the heat to cook the eggs and create a creamy sauce.",
    "Serve immediately and garnish with additional grated Parmesan cheese and black pepper if desired.",
  ],
};

app.post(url, async (req, res) => {
  const formData = req.body;
  const response = await askGPT(formData, resFormat);
  const response = res.send(response);
});

const port = 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
