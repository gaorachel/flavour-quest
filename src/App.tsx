import { Formik, Form, Field } from "formik";
import { Container, Heading, Button, useToast, Center, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { options } from "./data/questOptions";

import type { Answers } from "./type";
import { MultiSelect } from "./components/MultiSelect";
import { RangeSliderWithIndexValue } from "./components/RangeSliderWithIndexValue";
import { RadioGroup } from "./components/RadioGroup";
import { NumInput } from "./components/NumInput";

export function App() {
  const toast = useToast();

  return (
    <>
      <Formik
        initialValues={{
          preferredCuisines: [],
          preferredFlavours: [],
          spicyLevels: "Hot",
          preferredStyle: [],
          preferredMaterials: [],
          preferredIngredients: [],
          dietaryRestrictions: [],
          specificGoals: [],
          mealSize: "",
          mealtime: [],
          cookingTime: { min: 15, max: 60 },
          servingSize: { min: 1, max: 3 },
          cookingFacilities: [],
          specificCookingTechniques: [],
          specificTextures: [],
          budget: {
            unit: "per person",
            value: { min: 15, max: 50 },
            currency: "GBP",
          },
        }}
        onSubmit={(answers: Answers) => {
          console.log(JSON.stringify(answers, null, 2));
        }}
      >
        <Form>
          <Container mb={16}>
            <Heading paddingY={5} size="xl">
              Quests....
            </Heading>
            <Field
              name="preferredCuisines"
              formLabel="What are your preferred cuisines?"
              component={MultiSelect}
              optionArr={options.preferredCuisines}
            />

            <Field
              name="preferredFlavours"
              formLabel="What are your preferred flavours?"
              component={MultiSelect}
              optionArr={options.preferredFlavours}
            />

            <FormControl>
              <FormLabel>How spicy you would like?</FormLabel>
              <Field
                name="spicyLevels"
                component={RadioGroup}
                optionArr={options.spicyLevels}
                defaultValue={options.spicyLevels[2]}
                borderRadius="full"
              />
            </FormControl>

            <Field
              name="preferredStyle"
              formLabel="What are your preferred styles?"
              component={MultiSelect}
              optionArr={options.preferredStyle}
            />

            <Field
              name="preferredMaterials"
              formLabel="What are your preferred materials?"
              component={MultiSelect}
              optionArr={options.preferredMaterials}
            />

            <Field
              name="preferredIngredients"
              formLabel="What are your preferred ingredients?"
              component={MultiSelect}
              optionArr={options.preferredIngredients}
            />

            <Field
              name="dietaryRestrictions"
              formLabel="Do you have any dietary restrictions or allergies?"
              component={MultiSelect}
              optionArr={options.dietaryRestrictions}
            />

            <Field
              name="specificGoals"
              formLabel="Do you have any specific goals related to your meals?"
              component={MultiSelect}
              optionArr={options.specificGoals}
            />

            <Field
              name="servingSize"
              formLabel="How many people will you be cooking for?"
              component={NumInput}
              min={options.servingSize.min}
              max={options.servingSize.max}
              defaultValue={[1, 3]}
            />

            <Field
              name="mealtime"
              formLabel="What are your preferred meal time?"
              component={MultiSelect}
              optionArr={options.mealtime}
            />

            <Field
              name="cookingTime"
              formLabel="How much time (minutes) would you prefer to spend on cooking/preparing the meal?"
              component={RangeSliderWithIndexValue}
              defaultValue={[options.cookingTime.min, options.cookingTime.max]}
              min={0}
              max={120}
            />

            <Field
              name="cookingFacilities"
              formLabel="What cooking facilities do you have available?"
              component={MultiSelect}
              optionArr={options.cookingFacilities}
            />

            <Field
              name="specificCookingTechniques"
              formLabel="Are there any specific cooking techniques you enjoy or prefer?"
              component={MultiSelect}
              optionArr={options.specificCookingTechniques}
            />

            <Field
              name="specificTextures"
              formLabel="Are there any specific textures or consistencies you enjoy?"
              component={MultiSelect}
              optionArr={options.specificTextures}
            />

            <FormControl>
              <FormLabel>What is your budget?</FormLabel>

              <HStack alignItems="center" justify="space-between" p={1}>
                <Field
                  name="budget.currency"
                  component={RadioGroup}
                  optionArr={options.budget.currency}
                  defaultValue={options.budget.currency[0]}
                  borderRadius="full"
                />

                <Field
                  name="budget.unit"
                  component={RadioGroup}
                  optionArr={options.budget.unit}
                  defaultValue={options.budget.unit[0]}
                  space={0}
                />
              </HStack>
              <Field
                name="budget.value"
                component={RangeSliderWithIndexValue}
                defaultValue={[options.budget.value.min, options.budget.value.max]}
                min={0}
                max={200}
              />
            </FormControl>
          </Container>

          <Center>
            <Button
              w="570px"
              bg="green.400"
              type="submit"
              onClick={() =>
                toast({
                  title: "Form submitted.",
                  description: "Your personal recipe is generating!",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                })
              }
            >
              Submit
            </Button>
          </Center>
        </Form>
      </Formik>
    </>
  );
}
