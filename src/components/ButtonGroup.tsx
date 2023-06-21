import { Box, HStack, ResponsiveValue, UseRadioProps, useRadio, useRadioGroup } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { FieldProps } from "formik";

interface ButtonProps extends UseRadioProps {
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

function Button(props: ButtonProps) {
  const { state, getInputProps, getCheckboxProps } = useRadio(props);

  return (
    <Box as="label">
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
    </Box>
  );
}

interface ButtonGroupProps extends FieldProps {
  name: string;
  optionArr: string[];
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

export function ButtonGroup(props: ButtonGroupProps) {
  const {
    optionArr,
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
    <HStack spacing={space} {...getRootProps()}>
      {optionArr.map((option) => {
        const btn = getRadioProps({ value: option });
        return (
          <Button key={option} {...btn} borderRadius={borderRadius} isChecked={field.value === option}>
            {option}
          </Button>
        );
      })}
    </HStack>
  );
}
