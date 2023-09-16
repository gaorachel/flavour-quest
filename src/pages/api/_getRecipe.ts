import { Configuration, OpenAIApi } from "openai";

import type { Choices } from "@/type";

export const backupRecipe = {
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
};

async function askGPT(data: Choices) {
  const format = `{
    recipeName: string;
    cuisineType: string;
    servings: number;
    prepTime: number;
    cookTime: number;
    totalTime: number;
    ingredients: string[];
    instructions: string[];
  }`;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Hi, can you give me 1 recipe based on the following info. No need to meet all the requirements: ${JSON.stringify(
            data
          )}. Here is the result format: ${format}`,
        },
      ],
    });

    return JSON.parse(completion.data.choices[0].message?.content as string);
  } catch (e) {
    return backupRecipe;
  }
}

async function resBackup(timeout: number) {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(backupRecipe);
    }, timeout)
  );
}

export function getRecipe(data: Choices) {
  return Promise.race([askGPT(data), resBackup(8000)]);
}
