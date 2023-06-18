import { Box, HStack, UseRadioProps, useRadio, useRadioGroup } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomRadioProps extends UseRadioProps {
  children: ReactNode;
}

function CustomRadio(props: CustomRadioProps) {
  const { state, getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="full"
        borderColor="gray.300"
        color="gray"
        _checked={{
          bg: state.isChecked ? "orange" : "transparent",
          borderWidth: "3px",
          borderColor: "orange",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={2}
        py={0.4}
      >
        {props.children}
      </Box>
    </Box>
  );
}

interface FullRoundedButtonGroupProps {
  optionArr: string[];
  defaultOption?: string;
}

export function FullRoundedButtonGroup({ optionArr, defaultOption }: FullRoundedButtonGroupProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: defaultOption,
  });

  return (
    <HStack {...getRootProps()}>
      {optionArr.map((option) => {
        const radio = getRadioProps({ value: option });
        return (
          <CustomRadio key={option} {...radio}>
            {option}
          </CustomRadio>
        );
      })}
    </HStack>
  );
}
