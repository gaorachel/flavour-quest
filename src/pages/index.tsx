import { useState } from "react";
import { useRouter } from "next/router";
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
  Box,
} from "@chakra-ui/react";
import { questions } from "@/data/questions";
import { MultiSelect } from "../components/MultiSelect";
import { RangeSliderWithIndexValue } from "../components/RangeSliderWithIndexValue";
import { RadioGroup } from "../components/RadioGroup";
import { NumInput } from "../components/NumInput";

import type { Choices } from "../type";

export default function QuestForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<string[]>();
  const router = useRouter();
  const toast = useToast();

  const displayAnswersOnModal = (answers: Choices) => {
    const sortedAnswers: string[] = [];
    for (const [key, value] of Object.entries(answers)) {
      const keyText = key.replace(/([A-Z])/g, " $1");
      const sortedKeyText = keyText.charAt(0).toUpperCase() + keyText.slice(1);

      let valueText = "";
      if (Array.isArray(value)) valueText = value.join(", ");
      if (key === "cookingTime") valueText = `${Object.values(value)[0]} - ${Object.values(value)[1]} mins`;
      if (key === "servingSize") valueText = `${Object.values(value)[0]} - ${Object.values(value)[1]} people`;
      if (key === "budget") valueText = `${value.currency} ${value.value.min} - ${value.value.max} ${value.unit}`;
      if (key === "spicyLevels") valueText = value;

      if (value.length !== 0) sortedAnswers.push(`${sortedKeyText}: ${valueText}`);
    }
    setModalData(sortedAnswers);
  };

  const sendAPIReq = async (answers: Choices | Choices) => {
    const res = await axios.post("/api/quest", answers);

    let timeout = 0;
    if (process.env.NODE_ENV === "development") timeout = 4000;

    setTimeout(() => {
      router.push({
        pathname: "/results",
        query: { data: JSON.stringify(res.data) },
      });
    }, timeout);
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

  const generateRandomAnswers = (optionArr: Choices) => {
    let pickedoptionArr: Choices = {};
    const randIndices: number[] = [];
    for (let time = 0; time < randIntBetween(5, 8); ) {
      const randIdx = randIntBy(optionArr);

      if (!randIndices.includes(randIdx)) {
        const pickedEl = Object.fromEntries([Object.entries(optionArr)[randIdx]]);
        pickedoptionArr = { ...pickedoptionArr, ...pickedEl };
        randIndices.push(randIdx);
      }

      time++;
    }

    let pickedAnswers: Choices = {};
    for (const [key, value] of Object.entries(pickedoptionArr)) {
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
    return pickedAnswers;
  };

  const handleSubmit = async (answers: Choices) => {
    displayAnswersOnModal(answers);
    sendAPIReq(answers);
  };

  const handleYoloBtnClick = async (optionArr: Choices) => {
    const answers = generateRandomAnswers(optionArr);

    onOpen(); // show modal on the screen
    displayAnswersOnModal(answers);
    sendAPIReq(answers);
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
                {questions.map((el) => {
                  if (el.id === "budget") {
                    return (
                      <Box key={el.id}>
                        <FormControl>
                          <FormLabel>{el.question}</FormLabel>

                          <HStack alignItems="center" justify="space-between" p={1}>
                            <Field
                              name="budget.currency"
                              component={RadioGroup}
                              optionArr={el.optionObj?.currency}
                              defaultValues={el.optionObj?.currency[0]}
                              borderRadius="full"
                            />

                            <Field
                              name="budget.unit"
                              component={RadioGroup}
                              optionArr={el.optionObj?.unit}
                              defaultValues={el.optionObj?.unit[0]}
                              space={0}
                            />
                          </HStack>
                          <Field
                            name="budget.value"
                            component={RangeSliderWithIndexValue}
                            min={el.valueRange?.min}
                            max={el.valueRange?.min}
                            defaultValues={[30, 50]}
                          />
                        </FormControl>
                      </Box>
                    );
                  }

                  if (el.type === "multi-selection")
                    return (
                      <Field name={el.id} formLabel={el.question} component={MultiSelect} optionArr={el.optionArr} />
                    );

                  if (el.type === "radio")
                    return (
                      <Field
                        name={el.id}
                        formLabel={el.question}
                        component={RadioGroup}
                        optionArr={el.optionArr}
                        defaultValues={el.defaultValues}
                        borderRadius="full"
                      />
                    );

                  if (el.type === "number-input")
                    return (
                      <Field
                        name={el.id}
                        formLabel={el.question}
                        component={NumInput}
                        min={el.valueRange?.min}
                        max={el.valueRange?.max}
                        defaultValues={[el.defaultValues?.min, el.defaultValues?.min]}
                      />
                    );

                  if (el.type === "range")
                    return (
                      <Field
                        name={el.id}
                        formLabel={el.question}
                        component={RangeSliderWithIndexValue}
                        min={el.valueRange?.min}
                        max={el.valueRange?.max}
                        defaultValues={[el.defaultValues?.min, el.defaultValues?.min]}
                      />
                    );
                })}
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
                  {/* <Button onClick={() => handleYoloBtnClick(questions)} colorScheme="blue">
                    YOLO
                  </Button> */}
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
