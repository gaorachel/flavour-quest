export interface Choices {
  preferredCuisines?: string[] | string;
  preferredFlavours?: string[] | string;
  spicyLevels?: string[] | string;
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
    unit?: string[] | string;
    value?: { min: number; max: number };
    currency?: string[] | string;
  };
}

export interface Format {
  recipeName: string;
  cuisineType: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  ingredients: string[];
  instructions: string[];
}
