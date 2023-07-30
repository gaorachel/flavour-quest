import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { MultiValue, Select } from "chakra-react-select";
import { FieldProps } from "formik";

interface MultiSelectProps extends FieldProps {
  formLabel: string;
  options: string[];
  placeholder?: string;
}

interface Option {
  label: string;
  value: string;
}

export function MultiSelect({
  formLabel,
  options,
  placeholder = "Select",
  field,
  form: { setFieldValue },
  ...props
}: MultiSelectProps) {
  const selectOptionMapper = (options: string[]) => {
    return options.map((option: string) => {
      return {
        label: option,
        value: option,
      };
    });
  };

  return (
    <Flex paddingY={5} id={field.name}>
      <FormControl>
        <FormLabel>{formLabel}</FormLabel>
        <Select
          isMulti
          variant="flushed"
          tagVariant="subtle"
          colorScheme="orange"
          closeMenuOnSelect={false}
          placeholder={placeholder}
          options={selectOptionMapper(options)}
          onChange={(selectedOptions: MultiValue<Option>) => {
            // Update the field value with the selected option values
            const selectedValues = selectedOptions.map((option) => option.value);
            setFieldValue(field.name, selectedValues);
          }}
          {...props}
        />
      </FormControl>
    </Flex>
  );
}
