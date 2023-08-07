import { useState } from "react";
import { useRouter } from "next/router";
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
import sendAPIReq from "../services/sendAPIReq";

import type { Question, Choices, ResultsRes } from "../type";

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

      if (value.length != 0) sortedAnswers.push(`${sortedKeyText}: ${valueText}`);
    }
    setModalData(sortedAnswers);
  };

  const navigateToResultsPage = (res: ResultsRes) => {
    let timeout = 0;
    if (process.env.NODE_ENV === "development") timeout = 4000;

    setTimeout(() => {
      router.push({
        pathname: "/results",
        query: { data: JSON.stringify(res) },
      });
    }, timeout);
  };

  const getRandomIntBy = (data: string[]) => {
    return Math.floor(Math.random() * data.length);
  };

  const getRandomIntBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min + 1) + min);
  };

  const getRandomElements = (arr: string[]) => {
    const selectedElements = new Set();
    const totalSelectTime = arr.length <= 4 ? arr.length : getRandomIntBetween(5, 8);
    for (let i = 0; i < totalSelectTime; i++) {
      const randIdx = Math.floor(Math.random() * arr.length);
      selectedElements.add(arr[randIdx]);
    }

    return Array.from(selectedElements);
  };

  const getRandomRange = (valueRange: [min: number, max: number]) => {
    const randNum1 = getRandomIntBetween(valueRange[0], valueRange[1]);
    const randNum2 = getRandomIntBetween(valueRange[0], valueRange[1]);

    if (randNum1 < randNum2) return [randNum1, randNum2];
    if (randNum1 > randNum2) return [randNum2, randNum1];

    return [randNum1 - 10, randNum2];
  };

  const generateRandomAnswers = (questions: Question[]) => {
    let pickedQuestions: Question[] = [];

    let pickedIndices: number[] = [];
    for (let i = 0; i < getRandomIntBetween(5, 8); i++) {
      const randIdx = Math.floor(Math.random() * questions.length);

      if (!pickedIndices.includes(randIdx)) {
        pickedQuestions.push(questions[randIdx]);
        pickedIndices.push(randIdx);
      }
    }

    let pickedAnswers: Choices = {};
    for (const question of pickedQuestions) {
      if (question.type === "multi-selection") {
        pickedAnswers = { ...pickedAnswers, [question.id]: getRandomElements(question.options) };
      }

      if (question.type === "number-input" || question.type === "range") {
        pickedAnswers = { ...pickedAnswers, [question.id]: getRandomRange(question.valueRange) };
      }

      if (question.type === "radio") {
        const randIdx = getRandomIntBy(question.options);
        pickedAnswers = { ...pickedAnswers, [question.id]: question.options[randIdx] };
      }

      if (question.type === "custom" && question.id === "budget" && question.valueRange) {
        const randIdx1 = getRandomIntBy(question.options.unit);
        const randIdx2 = getRandomIntBy(question.options.currency);
        const randRange = getRandomRange(question.valueRange);

        pickedAnswers = {
          ...pickedAnswers,
          [question.id]: {
            unit: question.options.unit[randIdx1],
            currency: question.options.currency[randIdx2],
            value: { min: randRange[0], max: randRange[1] },
          },
        };
      }
    }

    return pickedAnswers;
  };

  const handleSubmit = async (answers: Choices) => {
    displayAnswersOnModal(answers);
    const res = await sendAPIReq(answers);
    navigateToResultsPage(res);
  };

  const handleYoloBtnClick = async (questions: Question[]) => {
    const answers = generateRandomAnswers(questions);

    onOpen(); // show modal on the screen
    displayAnswersOnModal(answers);
    const res = await sendAPIReq(answers);
    navigateToResultsPage(res);
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
          budget: {
            unit: "per person",
            currency: "GBP",
            value: { min: 15, max: 50 },
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
                  if (el.type === "multi-selection")
                    return (
                      <Field
                        component={MultiSelect}
                        name={el.id}
                        formLabel={el.label}
                        options={el.options}
                        key={el.id}
                      />
                    );

                  if (el.type === "radio")
                    return (
                      <Field
                        component={RadioGroup}
                        name={el.id}
                        formLabel={el.label}
                        options={el.options}
                        defaultValue={el.defaultOption}
                        borderRadius="full"
                        key={el.id}
                      />
                    );

                  if (el.type === "number-input")
                    return (
                      <Field
                        component={NumInput}
                        name={el.id}
                        formLabel={el.label}
                        valueRange={el.valueRange}
                        defaultValue={el.defaultValue}
                        key={el.id}
                      />
                    );

                  if (el.type === "range")
                    return (
                      <Field
                        component={RangeSliderWithIndexValue}
                        name={el.id}
                        formLabel={el.label}
                        valueRange={el.valueRange}
                        defaultValue={el.defaultValue}
                        key={el.id}
                      />
                    );
                  if (el.id === "budget") {
                    return (
                      <Box key={el.id}>
                        <FormControl>
                          <FormLabel>{el.label}</FormLabel>

                          <HStack alignItems="center" justify="space-between" p={1}>
                            <Field
                              component={RadioGroup}
                              name="budget.currency"
                              options={el.options.currency}
                              defaultValue={el.options.currency[0]}
                              borderRadius="full"
                            />

                            <Field
                              component={RadioGroup}
                              name="budget.unit"
                              options={el.options.unit}
                              defaultValue={el.options.unit[0]}
                              space={0}
                            />
                          </HStack>
                          <Field
                            component={RangeSliderWithIndexValue}
                            name="budget.value"
                            valueRange={el.valueRange}
                            defaultValue={el.defaultValue}
                          />
                        </FormControl>
                      </Box>
                    );
                  }
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
                  <Button onClick={() => handleYoloBtnClick(questions)} colorScheme="blue">
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
