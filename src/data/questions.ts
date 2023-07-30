import { Question } from "@/type";

export const questions: Question[] = [
  {
    id: "preferredCuisines",
    type: "multi-selection",
    label: "What are your preferred cuisines?",
    options: [
      "Any",
      "Chinese",
      "Turkish",
      "Italian",
      "Greek",
      "French",
      "Indian",
      "Thai",
      "British",
      "Japanese",
      "Mexican",
      "Spanish",
      "Korean",
      "Mediterranean",
    ],
  },
  {
    id: "preferredFlavours",
    type: "multi-selection",
    label: "What are your preferred flavours?",
    options: [
      "Any",
      "Sweet",
      "Savory",
      "Spicy",
      "Tangy",
      "Salty",
      "Sour",
      "Smoky",
      "Umami",
      "Creamy",
      "Fruity",
      "Citrusy",
      "Robust",
      "Earthy",
    ],
  },
  {
    id: "spicyLevels",
    type: "radio",
    label: "How spicy would you like?",
    options: ["Mild", "Medium", "Hot", "Very Hot", "Extremely"],
    defaultOption: "Hot",
  },
  {
    id: "preferredStyle",
    type: "multi-selection",
    label: "What are your preferred styles?",
    options: ["Meat or Poultry", "Fish or Seafood", "Flexitarian", "Pescatarian", "Acto-ovo ", "Vegetarian", "Vegan"],
  },
  {
    id: "preferredMaterials",
    type: "multi-selection",
    label: "What are your preferred materials?",
    options: ["Potato", "Tomato", "Aubergine", "Pork", "Beef", "Chicken", "Lamp", "Egg"],
  },
  {
    id: "preferredIngredients",
    type: "multi-selection",
    label: "What are your preferred ingredients?",
    options: ["Cumin", "Black Pepper", "Basil", "Parsley"],
  },
  {
    id: "dietaryRestrictions",
    type: "multi-selection",
    label: "Do you have any dietary restrictions or allergies?",
    options: ["Coriander", "Nuts", "Mango"],
  },
  {
    id: "specificGoals",
    type: "multi-selection",
    label: "Do you have any specific goals related to your meals?",
    options: ["Weight lost", "Low carb", "Low fat", "More vegetables", "More protein"],
  },
  {
    id: "servingSize",
    type: "number-input",
    label: "How many people will you be cooking for?",
    valueRange: [1, 30],
    defaultValue: [1, 3],
  },
  {
    id: "mealtime",
    type: "multi-selection",
    label: "What are your preferred meal time?",
    options: ["Breakfast", "Lunch", "Dinner", "Snacks"],
  },
  {
    id: "cookingTime",
    type: "range",
    label: "How much time (minutes) would you prefer to spend on cooking/preparing the meal?",
    valueRange: [0, 120],
    defaultValue: [15, 30],
  },
  {
    id: "cookingFacilities",
    type: "multi-selection",
    label: "What cooking facilities do you have available?",
    options: [
      "Stovetop",
      "Induction Cooktop",
      "Oven",
      "Microwave",
      "Toaster",
      "Air Fryer",
      "Outdoor grill",
      "Rice Cooker",
      "Looking for no-cook or minimal-cook meal options",
    ],
  },
  {
    id: "specificCookingTechniques",
    type: "multi-selection",
    label: "Are there any specific cooking techniques you enjoy or prefer?",
    options: ["Grilling", "Slow-cooking", "Stir-frying", "Baking"],
  },
  {
    id: "budget",
    type: "custom",
    label: "What is your budget?",
    options: {
      unit: ["per person", "per meal"],
      currency: ["GBP", "EUR", "USD"],
    },
    valueRange: [0, 200],
    defaultValue: [15, 50],
  },
];
