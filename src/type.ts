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
