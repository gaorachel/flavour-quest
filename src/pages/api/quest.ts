import { mockRes } from './_mockRes';
import axios from 'axios';
import { askGPT } from './_openai';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Choices, Format } from '@/type';

const imgBackup =
  'https://assets.bonappetit.com/photos/57ae3e611b33404414975c0d/16:9/w_1280,c_limit/roasted-chicken-thighs-with-lemon-and-oregano.jpg';
const resExample = {
  recipeName: 'Spaghetti Carbonara',
  cuisineType: 'Italian',
  servings: 2,
  prepTime: 10,
  cookTime: 15,
  totalTime: 25,
  ingredients: [
    '200g spaghetti',
    '100g pancetta',
    '2 cloves of garlic',
    '2 large eggs',
    '50g grated Parmesan cheese',
    'Salt and black pepper to taste',
  ],
  instructions: [
    'Bring a large pot of salted water to a boil and cook spaghetti according to package instructions until al dente.',
    'Meanwhile, in a large skillet, fry pancetta until crispy. Remove from heat and set aside.',
    'In a separate bowl, whisk together eggs, grated Parmesan cheese, salt, and black pepper.',
    'Once spaghetti is cooked, drain it and quickly toss it in the skillet with the pancetta. Remove from heat.',
    'Pour the egg mixture over the hot spaghetti while stirring continuously, allowing the heat to cook the eggs and create a creamy sauce.',
    'Serve immediately and garnish with additional grated Parmesan cheese and black pepper if desired.',
  ],
};

export default async function questHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (process.env.NODE_ENV === 'development') return res.send({ ...mockRes, img: imgBackup });

  try {
    const formData: Choices = req.body;
    const recipeRes: Format = await askGPT(formData, resExample);

    try {
      const imgRes = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: process.env.GOOGLE_SEARCH_API_KEY,
          cx: process.env.GOOGLE_SEARCH_API_CX,
          searchType: 'image',
          num: 1,
          hq: '16:9',
          gl: 'countryUK',
          q: recipeRes.recipeName,
        },
      });

      res.send({ ...recipeRes, img: imgRes.data.items[0].link });
    } catch (e) {
      res.send({ ...recipeRes, img: imgBackup });
    }
  } catch (e) {
    res.send({ ...mockRes, img: imgBackup });
  }
}
