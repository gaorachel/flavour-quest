import express, { Request, Response } from "express";
import axios from "axios";
import { askGPT } from "./openai";

import { Answers, Format } from "./type";

// import recipeRes from "./mockRes.js";
// import imgRes = "https://shewearsmanyhats.com/wp-content/uploads/2015/12/roasted-garlic-lemon-chicken-recipe-1.jpg";

const app = express();
app.use(express.json());

const url = "/api/v1/quest";

const resExample = {
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

app.post(url, async (req: Request, res: Response) => {
  try {
    const formData: Answers = req.body;
    const recipeRes: Format = await askGPT(formData, resExample);

    const imgRes = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: process.env.GOOGLE_SEARCH_API_KEY,
        cx: process.env.GOOGLE_SEARCH_API_CX,
        searchType: "image",
        num: 1,
        hq: "16:9",
        imgSize: "large",
        gl: "countryUK",
        q: recipeRes.recipeName,
      },
    });

    res.status(201).send({ ...recipeRes, img: imgRes.data.items[0].link });

    // res.send({ ...recipeRes, img: imgRes });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

const port = 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
