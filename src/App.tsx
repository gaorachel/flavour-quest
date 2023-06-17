import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Tag,
  TagLabel,
  withDefaultVariant,
} from "@chakra-ui/react";
import { AsyncCreatableSelect, AsyncSelect, CreatableSelect, Select } from "chakra-react-select";
import { options } from "./data/questOptions";
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
  const selectOptionMapper = (optionArr: string[]) => {
    const selectOptionArr: object[] = [];

    optionArr.map((option: string) =>
      selectOptionArr.push({
        label: option,
        value: option,
      })
    );
    return selectOptionArr;
  };

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
          <Container mb={16}>
            <Heading paddingY={5} size="xl">
              Quests....
            </Heading>
            <FormControl>
              <FormLabel>What are your preferred cuisines?</FormLabel>
              <Select
                isMulti
                variant="unstyled"
                tagVariant="subtle"
                placeholder="Select some cuisines?"
                colorScheme="green"
                closeMenuOnSelect={false}
                options={selectOptionMapper(options.preferredCuisines)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>What are your preferred materials?</FormLabel>
              <Select
                isMulti
                variant="unstyled"
                tagVariant="subtle"
                placeholder="Select some materials?"
                colorScheme="red"
                closeMenuOnSelect={false}
                options={selectOptionMapper(options.preferredMaterials)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>How spicy you would like?</FormLabel>
              <HStack paddingBottom={3}>
                {options.spicyLevels.map((spicyLevel) => (
                  <Tag key={spicyLevel} colorScheme="red">
                    <TagLabel>{spicyLevel}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel>What are your preferred styles?</FormLabel>
              <Select
                isMulti
                variant="unstyled"
                tagVariant="subtle"
                placeholder="Select some styles?"
                colorScheme="green"
                closeMenuOnSelect={false}
                options={selectOptionMapper(options.preferredStyle)}
              />
            </FormControl>
          </Container>
        </Form>
      </Formik>
    </>
  );
}

export default App;
