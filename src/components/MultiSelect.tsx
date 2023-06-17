import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import type { Options } from "../type";

interface MultiSelectProps {
  formLabel: string;
  optionArr: string[];
  placeholder?: string;
}

export function MultiSelect({ formLabel, optionArr, placeholder = "Select" }: MultiSelectProps) {
  const selectOptionMapper = (optionArr: string[]) => {
    return optionArr.map((option) => {
      return {
        label: option,
        value: option,
      };
    });
  };

  return (
    <Flex paddingY={5}>
      <FormControl>
        <FormLabel>{formLabel}</FormLabel>
        <Select
          isMulti
          variant="flushed"
          tagVariant="subtle"
          colorScheme="orange"
          closeMenuOnSelect={false}
          placeholder={placeholder}
          options={selectOptionMapper(optionArr)}
        />
      </FormControl>
    </Flex>
  );
}
