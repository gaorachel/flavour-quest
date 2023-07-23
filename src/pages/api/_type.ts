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
