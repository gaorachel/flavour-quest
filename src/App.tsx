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
          <Container mb={16}>
            <Progress value={80} size="xs" colorScheme="orange" />
            <Flex flexDirection={"row-reverse"}>
              <Text as="sub" fontSize="sm" color="tomato">
                Completed 12/20
              </Text>
            </Flex>

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

        {/* <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option> */}

        {/* <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={1} onChangeEnd={(val) => console.log(val)}>
            <RangeSliderTrack bg="green.100">
              <RangeSliderFilledTrack bg="green" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={3} index={0} />
            <RangeSliderThumb boxSize={3} index={1} />
          </RangeSlider> */}

        {/* <button type="submit"> submit</button> */}
      </Formik>
    </>
  );
}

export default App;
