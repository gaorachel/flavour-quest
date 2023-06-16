import React, { useState } from "react";
import { Formik, Form } from "formik";
import "./App.css";

interface Answers {
  preferredCuisines: string[];
  preferredFlavours: string[];
  spicyLevel: string[];
  preferredMaterials: string[]; //"meat or poultry" | "fish or seafood" | "flexitarian" | "pescatarian" | "acto-ovo " | "vegetarian" | "vegan";
  preferredIngredients: string[]; // cumin
  dietaryRestrictions: string[];
  specificGoals: string[];
  mealSize: "little" | "small" | "regular" | "large" | "super large";
  mealtime: string[];
  cookingTime: [min: number, max: number];
  servingSize: [min: number, max: number];
  cookingFacilities: string[];
  specificCookingTechniques: string[];
  specificTextures: string[]; // creamy or crunchy
  budget: {
    unit: "per person" | "per meal";
    cost: [min: number, max: number];
    currency: string;
  };
}

// {
//   preferredCuisines: [],
//   preferredFlavours: [],
//   spicyLevel: [],
//   preferredMaterials: [],
//   preferredIngredients: [],
//   dietaryRestrictions: [],
//   specificGoals: [],
//   mealSize: "regular",
//   mealtime: [],
//   cookingTime: [],
//   servingSize: [],
//   cookingFacilities: [],
//   specificCookingTechniques: [],
//   specificTextures: [], // creamy or crunchy
//   budget: {
//     unit: "per person",
//     cost: [],
//   }
// }

function App() {
  return (
    <>
      <Formik
        initialValues={{
          preferredCuisines: [],
          preferredFlavours: [],
          spicyLevel: [],
          preferredMaterials: [],
          preferredIngredients: [],
          dietaryRestrictions: [],
          specificGoals: [],
          mealSize: "regular",
          mealtime: [],
          cookingTime: [15, 30],
          servingSize: [2, 3],
          cookingFacilities: [],
          specificCookingTechniques: [],
          specificTextures: [], // creamy or crunchy
          budget: {
            unit: "per person",
            cost: [50, 100],
            currency: "GBP",
          },
        }}
        onSubmit={() => {
          console.log("submitted!");
        }}
      >
        <Form>
          <button type="submit"> submit</button>
        </Form>
      </Formik>
    </>
  );
}

export default App;
