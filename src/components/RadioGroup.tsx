import {
  Box,
  Center,
  Flex,
  FormLabel,
  HStack,
  ResponsiveValue,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { FieldProps } from "formik";
import { VALID_LOADERS } from "next/dist/shared/lib/image-config";

interface RadioProps extends UseRadioProps {
  children: ReactNode;
  borderRadius?:
    | ResponsiveValue<
        | number
        | "none"
        | (string & object)
        | "base"
        | "inherit"
        | "-moz-initial"
        | "initial"
        | "revert"
        | "revert-layer"
        | "unset"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "full"
        | "3xl"
      >
    | undefined;
}

function Radio(props: RadioProps) {
  const { state, getInputProps, getCheckboxProps } = useRadio(props);

  return (
    <HStack as="label" id={props.name}>
      <input {...getInputProps()} />
      <Box
        {...getCheckboxProps()}
        borderRadius={props.borderRadius}
        _checked={{
          bg: state.isChecked ? "orange" : "transparent",
          borderWidth: "2px",
          borderColor: "orange",
          color: "white",
        }}
        cursor="pointer"
        borderWidth="2px"
        borderColor="gray.300"
        color="gray"
        px={2}
        py={0.4}
      >
        {props.children}
      </Box>
    </HStack>
  );
}

interface RadioGroupProps extends FieldProps {
  formLabel: string;
  options: string[];
  defaultValue?: string;
  space?: number;
  borderRadius?:
    | ResponsiveValue<
        | number
        | "none"
        | (string & object)
        | "base"
        | "inherit"
        | "-moz-initial"
        | "initial"
        | "revert"
        | "revert-layer"
        | "unset"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "full"
        | "3xl"
      >
    | undefined;
}

export function RadioGroup(props: RadioGroupProps) {
  const {
    options,
    defaultValue,
    space,
    borderRadius,
    field,
    form: { setFieldValue },
  } = props;

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue,
    name: field.name,
    onChange: (value) => {
      setFieldValue(field.name, value);
    },
  });

  useEffect(() => {
    if (defaultValue && !field.value) {
      setFieldValue(field.name, defaultValue);
    }
  }, [defaultValue, field.name, field.value, setFieldValue]);

  return (
    <Flex direction="column" id={field.name}>
      <FormLabel> {props.formLabel} </FormLabel>
      <Center>
        <HStack spacing={space} {...getRootProps()}>
          {options.map((option) => {
            const radio = getRadioProps({ value: option });
            return (
              <Radio key={option} {...radio} borderRadius={borderRadius} isChecked={field.value === option}>
                {option}
              </Radio>
            );
          })}
        </HStack>
      </Center>
    </Flex>
  );
}
