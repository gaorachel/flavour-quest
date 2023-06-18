import { Formik, Form } from "formik";
import {
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Progress,
  Text,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";
import { options } from "./data/questOptions";
import { MultiSelect } from "./components/MultiSelect";
import { RangeSliderWithIndexValue } from "./components/RangeSliderWithIndexValue";
import { ButtonGroup } from "./components/ButtonGroup";

function App() {
  const toast = useToast();

  return (
    <>
      <Formik
        initialValues={{
          preferredCuisines: [],
          preferredFlavours: [],
          spicyLevels: "",
          preferredStyle: [],
          preferredMaterials: [],
          preferredIngredients: [],
          dietaryRestrictions: [],
          specificGoals: [],
          mealSize: "",
          mealtime: [],
          cookingTime: [],
          servingSize: [],
          cookingFacilities: [],
          specificCookingTechniques: [],
          specificTextures: [],
          budget: {
            unit: [],
            value: [],
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
              <ButtonGroup optionArr={options.spicyLevels} defaultOption={options.spicyLevels[2]} borderRadius="full" />
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

            <FormControl>
              <FormLabel>How many people will you be cooking for?</FormLabel>
              <HStack justify="center" gap={5}>
                <Flex align="center">
                  <Text fontSize="md" paddingRight={1}>
                    Min No.
                  </Text>
                  <NumberInput id="min-people-number" size="md" maxW={24} defaultValue={options.servingSize[0]} min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>

                <Flex align="center">
                  <Text fontSize="md" paddingRight={1}>
                    Max No.
                  </Text>
                  <NumberInput id="max-people-number" size="md" maxW={24} defaultValue={options.servingSize[1]} min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </HStack>
            </FormControl>

            <MultiSelect formLabel="What are your preferred meal time?" optionArr={options.mealtime} />

            <FormControl>
              <FormLabel>How much time (minutes) would you prefer to spend on cooking/preparing the meal?</FormLabel>
              <RangeSliderWithIndexValue defaultValue={options.cookingTime} min={0} max={120} />
            </FormControl>

            <FormControl paddingTop={5}>
              <FormLabel>What are your preferred meal sizes?</FormLabel>
              <ButtonGroup optionArr={options.mealSize} defaultOption={options.mealSize[2]} borderRadius="full" />
            </FormControl>

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

            <FormControl>
              <FormLabel>What is your budget?</FormLabel>
              <HStack alignItems="center" justify="space-between" p={1}>
                <ButtonGroup
                  defaultOption={options.budget.currency[0]}
                  optionArr={options.budget.currency}
                  borderRadius="full"
                />
                <ButtonGroup optionArr={options.budget.unit} defaultOption={options.budget.unit[0]} space={0} />
              </HStack>
              <RangeSliderWithIndexValue defaultValue={options.budget.value} min={0} max={200} />
            </FormControl>
          </Container>

          <Center>
            <Button
              w="570px"
              bg="green.400"
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

export default App;
