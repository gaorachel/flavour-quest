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
  valueRange: [min: number, max: number];
  defaultValues: [min: number, max: number];
}

export function NumInput(props: NumInputProps) {
  const {
    name,
    formLabel,
    valueRange,
    defaultValues,
    field,
    form: { setFieldValue },
  } = props;

  const [valueMin, setValueMin] = useState(defaultValues[0]);
  const [valueMax, setValueMax] = useState(defaultValues[1]);

  const handleChangeMin = (valueMin: string) => (
    setValueMin(parseFloat(valueMin)), setFieldValue(`${field.name}.min`, valueMin)
  );

  const handleChangeMax = (valueMax: string) => (
    setValueMax(parseFloat(valueMax)), setFieldValue(`${field.name}.max`, valueMax)
  );

  return (
    <Flex id={field.name}>
      <FormControl>
        <FormLabel>{formLabel}</FormLabel>
        <HStack justify="center" paddingX={130} gap={10}>
          <Flex align="center" gap={5}>
            <Box fontSize="md">Min No.</Box>
            <NumberInput
              id={`${name}-min`}
              name={`${name}.min`}
              value={valueMin}
              defaultValue={defaultValues[0]}
              min={valueRange[0]}
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
              defaultValue={defaultValues[1]}
              min={valueMin}
              max={valueRange[1]}
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
    </Flex>
  );
}
