interface MultiSelection {
  id: string;
  type: "multi-selection";
  label: string;
  options: string[];
}

interface Radio {
  id: string;
  type: "radio";
  label: string;
  options: string[];
  defaultOption: string;
}

interface Range {
  id: string;
  type: "range";
  label: string;
  valueRange: [min: number, max: number];
  defaultValue: [min: number, max: number];
}

interface NumberInput {
  id: string;
  type: "number-input";
  label: string;
  valueRange: [min: number, max: number];
  defaultValue: [min: number, max: number];
}

interface Custom {
  id: string;
  type: "custom";
  label: string;
  options: any;
  defaultOption?: string;
  valueRange?: [min: number, max: number];
  defaultValue?: [min: number, max: number];
}

export type Question = MultiSelection | Radio | Range | NumberInput | Custom;
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
  budget?: {
    unit?: string[] | string;
    value?: { min: number; max: number };
    currency?: string[] | string;
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
