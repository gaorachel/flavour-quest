export interface Choices {
  preferredCuisines?: string[] | string;
  preferredFlavours?: string[] | string;
  spicyLevels?: "Mild" | "Medium" | "Hot" | "Very Hot" | "Extremely";
  preferredStyle?: string[] | string;
  preferredMaterials?: string[] | string;
  preferredIngredients?: string[] | string;
  dietaryRestrictions?: string[] | string;
  specificGoals?: string[] | string;
  servingSize?: { min: number; max: number };
  mealtime?: string[] | string;
  cookingTime?: { min: number; max: number };
  cookingFacilities?: string[] | string;
  specificCookingTechniques?: string[] | string;
  specificTextures?: string[] | string;
  budget?: {
    unit?: "per person" | "per meal";
    value?: { min: number; max: number };
    currency?: "GBP" | "EUR" | "USD";
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
