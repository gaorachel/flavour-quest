export interface Options {
  preferredCuisines: string[];
  preferredFlavours: string[];
  spicyLevels: string[];
  preferredStyle: string[];
  preferredMaterials: string[];
  preferredIngredients: string[]; // cumin
  dietaryRestrictions: string[];
  specificGoals: string[];
  mealSize: ["little", "small", "regular", "large", "super large"];
  //   mealSize: "little" | "small" | "regular" | "large" | "super large" | string[];
  mealtime: string[];
  cookingTime?: [min: number, max: number];
  servingSize: [min: number, max: number | null];
  cookingFacilities: string[];
  specificCookingTechniques: string[];
  specificTextures: string[]; // creamy or crunchy
  budget?: {
    unit: "per person" | "per meal";
    cost: [min: number, max: number];
    currency: string;
  };
}
