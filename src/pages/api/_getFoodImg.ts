import axios from "axios";

import type { RecipeRes } from "@/type";

export const backupImg =
  "https://assets.bonappetit.com/photos/57ae3e611b33404414975c0d/16:9/w_1280,c_limit/roasted-chicken-thighs-with-lemon-and-oregano.jpg";

async function longJob(recipeRes: RecipeRes) {
  const imgRes = await axios.get<{ items: { link: string }[] }>("https://www.googleapis.com/customsearch/v1", {
    params: {
      key: process.env.GOOGLE_SEARCH_API_KEY,
      cx: process.env.GOOGLE_SEARCH_API_CX,
      searchType: "image",
      num: 1,
      hq: "16:9",
      gl: "countryUK",
      q: recipeRes.recipeName,
    },
  });

  return imgRes.data.items[0].link;
}

async function imgBackup(timeout: number) {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(backupImg);
    }, timeout)
  );
}

export function getFoodImg(recipeRes: RecipeRes) {
  return Promise.race([longJob(recipeRes), imgBackup(8000)]);
}
