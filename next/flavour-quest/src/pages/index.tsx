import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import {
  Container,
  Heading,
  Button,
  useToast,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Stack,
  Flex,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Highlight,
} from "@chakra-ui/react";
import { options } from "../data/questOptions";
import { MultiSelect } from "../components/MultiSelect";
import { RangeSliderWithIndexValue } from "../components/RangeSliderWithIndexValue";
import { RadioGroup } from "../components/RadioGroup";
import { NumInput } from "../components/NumInput";

import type { Choices } from "../type";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<string[]>();
  // const navigate = useNavigate();
  const toast = useToast();

  const displayAnswersOnModal = (answers: Choices) => {
    const sortedAnswers: string[] = [];
    for (const [key, value] of Object.entries(answers)) {
      const keyText = key.replace(/([A-Z])/g, " $1");
      const sortedKeyText = keyText.charAt(0).toUpperCase() + keyText.slice(1);

      let valueText = "";
      if (Array.isArray(value)) valueText = value.toString();
      if (key === "cookingTime") valueText = `${Object.values(value)[0]} - ${Object.values(value)[1]} mins`;
      if (key === "servingSize") valueText = `${Object.values(value)[0]} - ${Object.values(value)[1]} people`;
      if (key === "budget") valueText = `${value.currency} ${value.value.min} - ${value.value.max} ${value.unit}`;
      if (key === "spicyLevels") valueText = value;

      if (value.length != 0) sortedAnswers.push(`${sortedKeyText}: ${valueText}`);
    }
    setModalData(sortedAnswers);
  };

  const sendAPIReq = async (answers: Choices | Choices) => {
    const res = await axios.post("/api/v1/quest", answers);
    // navigate("/results", { state: res.data });
    // setTimeout(() => {
    //   navigate("/results", { state: res.data });
    // }, 50000);
  };

  const handleSubmit = async (answers: Choices) => {
    displayAnswersOnModal(answers), sendAPIReq(answers);
  };

  const randIntBy = (data: string[] | object) => {
    let len = 0;
    if (typeof data === "object") len = Object.keys(data).length;
    if (Array.isArray(data)) len = data.length;

    return Math.floor(Math.random() * len);
  };

  const randIntBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleClick = (options: Choices) => {
    onOpen(); // show modal on the screen

    let pickedOptions: Choices = {};
    const randIndices: number[] = [];
    for (let time = 0; time < randIntBetween(5, 8); ) {
      const randIdx = randIntBy(options);

      if (!randIndices.includes(randIdx)) {
        const pickedEl = Object.fromEntries([Object.entries(options)[randIdx]]);
        pickedOptions = { ...pickedOptions, ...pickedEl };
        randIndices.push(randIdx);
      }

      time++;
    }

    let pickedAnswers: Choices = {};
    for (const [key, value] of Object.entries(pickedOptions)) {
      if (key === "spicyLevels") {
        const randIdx = randIntBetween(0, 4);

        pickedAnswers = { ...pickedAnswers, [key]: value[randIdx] };
        continue;
      }

      if (Array.isArray(value)) {
        const pickedValues = new Set();
        for (let time = 0; time < randIntBetween(1, 7); ) {
          const randIdx = randIntBy(value);
          if (value[randIdx] !== "Any") pickedValues.add(value[randIdx]);

          pickedAnswers = { ...pickedAnswers, [key]: [...pickedValues] };
          time++;
        }
      }

      if (key === "servingSize" || key === "cookingTime") {
        // below are just some random params
        const ranNum = randIntBetween(1, 5);
        const min = Math.ceil(value.min * ranNum * 0.1);
        const max = Math.ceil(value.max * ranNum * 0.04);

        console.log("min", min, "max", max);
        pickedAnswers = { ...pickedAnswers, [key]: { min, max } };
      }

      if (key === "budget") {
        const unit = value.unit[randIntBetween(0, 1)];
        const min = value.value.min * randIntBetween(1, 3);
        const max = value.value.max * randIntBetween(1, 3);
        const currency = value.currency[randIntBetween(0, 2)];

        pickedAnswers = {
          ...pickedAnswers,
          [key]: {
            unit,
            value: {
              min,
              max,
            },
            currency,
          },
        };
      }
    }
    handleSubmit(pickedAnswers);
  };

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
          servingSize: { min: 1, max: 3 },
          mealtime: [],
          cookingTime: { min: 15, max: 60 },
          cookingFacilities: [],
          specificCookingTechniques: [],
          specificTextures: [],
          budget: {
            unit: "per person",
            value: { min: 15, max: 50 },
            currency: "GBP",
          },
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Flex minW="1000px">
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

                <>
                  <FormLabel> How spicy would you like? </FormLabel>
                  <Center>
                    <Field
                      name="spicyLevels"
                      component={RadioGroup}
                      optionArr={options.spicyLevels}
                      defaultValue={options.spicyLevels[2]}
                      borderRadius="full"
                    />
                  </Center>
                </>

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
                  min={options.servingSize?.min}
                  max={options.servingSize?.max}
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
                  defaultValue={[options.cookingTime?.min, options.cookingTime?.max]}
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
                      optionArr={options.budget?.currency}
                      defaultValue={"GBP"}
                      borderRadius="full"
                    />

                    <Field
                      name="budget.unit"
                      component={RadioGroup}
                      optionArr={options.budget?.unit}
                      defaultValue={"per person"}
                      space={0}
                    />
                  </HStack>
                  <Field
                    name="budget.value"
                    component={RangeSliderWithIndexValue}
                    defaultValue={[options.budget?.value?.min, options?.budget?.value?.max]}
                    min={0}
                    max={200}
                  />
                </FormControl>
              </Container>

              <Card maxW="sm" marginRight="7" marginLeft="1000" top="30%" position="fixed" right={0} bgColor="blue.100">
                <CardHeader>
                  <Heading size="md" color="blue.700">
                    Notes
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    Hey! you do NOT need to answer ALL the questions before submitting your quests.
                    <br />
                    <br />
                  </Text>
                  <Highlight
                    query="random recipe"
                    styles={{ px: "1", py: "1", bg: "orange.200", rounded: "5", fontWeight: "normal" }}
                  >
                    You can also click the button below to get a random recipe.
                  </Highlight>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => handleClick(options)} colorScheme="blue">
                    YOLO
                  </Button>
                </CardFooter>
              </Card>
            </Flex>

            <Center>
              <Button
                w="570px"
                bg="green.400"
                type="submit"
                marginBottom={5}
                onClick={() => {
                  onOpen(),
                    toast({
                      title: "Form submitted.",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                }}
              >
                Submit
              </Button>

              <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
                <ModalContent>
                  <ModalHeader> Here are your answers </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack>
                      {modalData?.map((row: string, i: number) => {
                        return <Text key={i}>{row}</Text>;
                      })}
                    </Stack>
                  </ModalBody>
                  <ModalFooter justifyContent="space-between">
                    <Text as="i" fontSize="lg" color="green.500">
                      Your personal recipe is generating!
                    </Text>
                    <Button colorScheme="teal" size="sm" isLoading></Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Center>
          </Form>
        )}
      </Formik>
    </>
  );
}
