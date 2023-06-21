import { useState } from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from "@chakra-ui/react";
import { FieldProps } from "formik";

interface NumInputProps extends FieldProps {
  id: string;
  name: string;
  formLabel: string;
  valueMin: number;
  valueMax: number;
  min: number;
  max: number;
  defaultValue: { min: number; max: number };
}

export function NumInput(props: NumInputProps) {
  const {
    name,
    formLabel,
    min,
    max,
    defaultValue,
    field,
    form: { setFieldValue },
  } = props;

  const [valueMin, setValueMin] = useState(0);
  const [valueMax, setValueMax] = useState(1);

  const handleChangeMin = (valueMin: string) => (
    setValueMin(parseFloat(valueMin)), setFieldValue(`${field.name}.min`, valueMin)
  );

  const handleChangeMax = (valueMax: string) => (
    setValueMax(parseFloat(valueMax)), setFieldValue(`${field.name}.max`, valueMax)
  );

  return (
    <>
      <FormControl>
        <FormLabel>{formLabel}</FormLabel>
        <HStack justify="center" paddingX={130} gap={10}>
          <Flex align="center" gap={5}>
            <Box fontSize="md">Min No.</Box>
            <NumberInput
              id={`${name}-min`}
              name={`${name}.min`}
              value={valueMin}
              defaultValue={defaultValue.min}
              min={min}
              max={valueMax}
              onChange={handleChangeMin}
              clampValueOnBlur={true}
              keepWithinRange={true}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>

          <Flex align="center" gap={5}>
            <Box fontSize="md">Max No.</Box>
            <NumberInput
              id={`${name}-max`}
              name={`${name}.max`}
              value={valueMax}
              defaultValue={defaultValue.max}
              min={valueMin}
              max={max}
              onChange={handleChangeMax}
              clampValueOnBlur={true}
              keepWithinRange={true}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </HStack>
      </FormControl>
    </>
  );
}
