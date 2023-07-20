export interface Options {
  preferredCuisines: string[];
  preferredFlavours: string[];
  spicyLevels: string[];
  preferredStyle: string[];
  preferredMaterials: string[];
  preferredIngredients: string[];
  dietaryRestrictions: string[];
  specificGoals: string[];
  mealSize: string[];
  mealtime: string[];
  cookingTime: { min: number; max: number };
  servingSize: { min: number; max: number };
  cookingFacilities: string[];
  specificCookingTechniques: string[];
  specificTextures: string[];
  budget: {
    unit: string[];
    value: { min: number; max: number };
    currency: string[];
  };
}
export interface Answers {
  preferredCuisines: string[] | undefined;
  preferredFlavours: string[] | undefined;
  spicyLevels: "Mild" | "Medium" | "Hot" | "Very Hot" | "Extremely";
  preferredStyle: string[] | undefined;
  preferredMaterials: string[] | undefined;
  preferredIngredients: string[] | undefined;
  dietaryRestrictions: string[] | undefined;
  specificGoals: string[] | undefined;
  mealSize: string;
  mealtime: string[] | undefined;
  cookingTime: { min: number; max: number } | undefined;
  servingSize: { min: number; max: number };
  cookingFacilities: string[] | undefined;
  specificCookingTechniques: string[] | undefined;
  specificTextures: string[] | undefined;
  budget: {
    unit: string;
    value: { min: number; max: number };
    currency: string;
  };
}

export interface ResultsRes {
  recipeName: string;
  cuisineType: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  ingredients: string[];
  instructions: string[];
  img: string;
}
