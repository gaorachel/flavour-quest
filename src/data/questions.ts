export const questions = [
  {
    id: "preferredCuisines",
    type: "multi-selection",
    question: "What are your preferred cuisines?",
    optionArr: [
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
    question: "What are your preferred flavours?",
    optionArr: [
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
    question: "How spicy would you like?",
    optionArr: ["Mild", "Medium", "Hot", "Very Hot", "Extremely"],
    defaultOption: "Hot",
  },
  {
    id: "preferredStyle",
    type: "multi-selection",
    question: "What are your preferred styles?",
    optionArr: ["Meat or Poultry", "Fish or Seafood", "Flexitarian", "Pescatarian", "Acto-ovo ", "Vegetarian", "Vegan"],
  },
  {
    id: "preferredMaterials",
    type: "multi-selection",
    question: "What are your preferred materials?",
    optionArr: ["Potato", "Tomato", "Aubergine", "Pork", "Beef", "Chicken", "Lamp", "Egg"],
  },
  {
    id: "preferredIngredients",
    type: "multi-selection",
    question: "What are your preferred ingredients?",
    optionArr: ["Cumin", "Black Pepper", "Basil", "Parsley"],
  },
  {
    id: "dietaryRestrictions",
    type: "multi-selection",
    question: "Do you have any dietary restrictions or allergies?",
    optionArr: ["Coriander", "Nuts", "Mango"],
  },
  {
    id: "specificGoals",
    type: "multi-selection",
    question: "Do you have any specific goals related to your meals?",
    optionArr: ["Weight lost", "Low carb", "Low fat", "More vegetables", "More protein"],
  },
  {
    id: "servingSize",
    type: "number-input",
    question: "How many people will you be cooking for?",
    valueRange: [1, 30],
    defaultValues: [1, 3],
  },
  {
    id: "mealtime",
    type: "multi-selection",
    question: "What are your preferred meal time?",
    optionArr: ["Breakfast", "Lunch", "Dinner", "Snacks"],
  },
  {
    id: "cookingTime",
    type: "range",
    question: "How much time (minutes) would you prefer to spend on cooking/preparing the meal?",
    valueRange: [0, 120],
    defaultValues: [15, 30],
  },
  {
    id: "cookingFacilities",
    type: "multi-selection",
    question: "What cooking facilities do you have available?",
    optionArr: [
      "Stovetop",
      "Induction Cooktop",
      "Oven",
      "Microwave",
      "Toaster",
      "Air Fryer",
      "Outdoor grill",
      "Rice Cooker",
      "Looking for no-cook or minimal-cook meal optionArr",
    ],
  },
  {
    id: "specificCookingTechniques",
    type: "multi-selection",
    question: "Are there any specific cooking techniques you enjoy or prefer?",
    optionArr: ["Grilling", "Slow-cooking", "Stir-frying", "Baking"],
  },
  {
    id: "budget",
    type: "custom",
    question: "What is your budget?",
    optionObj: {
      unit: ["per person", "per meal"],
      currency: ["GBP", "EUR", "USD"],
    },
    valueRange: [0, 200],
    defaultValues: [15, 50],
  },
];