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
  Progress,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { options } from "./data/questOptions";
import { MultiSelect } from "./components/MultiSelect";

import type { Options } from "./type";

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
          spicyLevels: [],
          preferredStyle: [],
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
          <Flex position="fixed" width="100vw">
            <Progress value={80} size="xs" colorScheme="orange" width="100vw" />
            <Flex flexDirection={"row-reverse"} width="100vw" padding={2}>
              <Text as="sub" fontSize="sm" color="tomato">
                Completed 12/20
              </Text>
            </Flex>
          </Flex>

          <Container mb={16}>
            <Heading paddingY={5} size="xl">
              Quests....
            </Heading>

            <MultiSelect formLabel="What are your preferred cuisines?" optionArr={options.preferredCuisines} />

            <MultiSelect formLabel="What are your preferred flavours?" optionArr={options.preferredFlavours} />

            <FormControl>
              <FormLabel>How spicy you would like?</FormLabel>
              <HStack paddingBottom={3}>
                {options.spicyLevels.map((spicyLevel) => (
                  <Tag key={spicyLevel} colorScheme="orange">
                    <TagLabel>{spicyLevel}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </FormControl>

            <MultiSelect formLabel="What are your preferred styles?" optionArr={options.preferredStyle} />

            <MultiSelect formLabel="What are your preferred ingredients?" optionArr={options.preferredIngredients} />

            <MultiSelect
              formLabel="Do you have any dietary restrictions or allergies??"
              optionArr={options.dietaryRestrictions}
            />

            <MultiSelect
              formLabel="Do you have any specific goals related to your meals??"
              optionArr={options.specificGoals}
            />
            </FormControl>
          </Container>
        </Form>

        {/* <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option> */}

        {/* <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={1} onChangeEnd={(val) => console.log(val)}>
            <RangeSliderTrack bg="orange.100">
              <RangeSliderFilledTrack bg="orange" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={3} index={0} />
            <RangeSliderThumb boxSize={3} index={1} />
          </RangeSlider> */}
            <MultiSelect
              formLabel="What cooking facilities do you have available?"
              optionArr={options.cookingFacilities}
            />

            <MultiSelect
              formLabel="Are there any specific cooking techniques you enjoy or prefer? "
              optionArr={options.specificCookingTechniques}
            />

            <MultiSelect
              formLabel="Are there any specific textures or consistencies you enjoy?"
              optionArr={options.specificTextures}
            />
            <MultiSelect

        {/* <button type="submit"> submit</button> */}
      </Formik>
    </>
  );
}

export default App;
