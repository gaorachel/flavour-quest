import { getRecipe } from "./_getRecipe";
import { getFoodImg } from "./_getFoodImg";
import { backupRecipe } from "./_getRecipe";
import { backupImg } from "./_getFoodImg";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Choices, RecipeRes } from "@/type";

export default async function questHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (process.env.NODE_ENV === "development") return res.send({ ...backupRecipe, img: backupImg });

  const formData: Choices = req.body;
  const recipeRes: RecipeRes = await getRecipe(formData);
  const imgRes = await getFoodImg(recipeRes);

  res.send({ ...recipeRes, img: imgRes });
}
