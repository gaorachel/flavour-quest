import { Box, HStack, ResponsiveValue, UseRadioProps, useRadio, useRadioGroup } from "@chakra-ui/react";
import { ReactNode } from "react";

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
  const { state, getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius={props.borderRadius}
        borderColor="gray.300"
        color="gray"
        _checked={{
          bg: state.isChecked ? "orange" : "transparent",
          borderWidth: "2px",
          borderColor: "orange",
          color: "white",
        }}
        px={2}
        py={0.4}
      >
        {props.children}
      </Box>
    </Box>
  );
}

interface ButtonGroupProps {
  optionArr: string[];
  defaultOption?: string;
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

export function ButtonGroup({ optionArr, defaultOption, space, borderRadius }: ButtonGroupProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: defaultOption,
  });

  return (
    <HStack spacing={space} {...getRootProps()}>
      {optionArr.map((option) => {
        const radio = getRadioProps({ value: option });
        return (
          <Button key={option} borderRadius={borderRadius} {...radio}>
            {option}
          </Button>
        );
      })}
    </HStack>
  );
}
