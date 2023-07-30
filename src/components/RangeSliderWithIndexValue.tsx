import { Flex, Box, Text, chakra, useRangeSlider, FormLabel } from "@chakra-ui/react";
import { FieldProps } from "formik";
interface ThumbProps {
  value: number;
  thumbProps: any;
  thumbIndex: number;
  bgColor?: string;
}

function Thumb({ value, thumbProps }: ThumbProps) {
  return (
    <Box
      top="1%"
      boxSize={8}
      bgColor="orange"
      borderRadius="full"
      _focusVisible={{
        outline: "outline",
      }}
      {...thumbProps}
    >
      <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
        <Text color="white">{value}</Text>
      </Flex>
    </Box>
  );
}
interface RangeSliderProps extends FieldProps {
  name: string;
  valueRange: [min: number, max: number];
  defaultValue: [min: number, max: number];
  formLabel?: string;
}

export function RangeSliderWithIndexValue(props: RangeSliderProps) {
  const {
    valueRange,
    defaultValue,
    formLabel,
    field,
    form: { setFieldValue },
  } = props;

  const { state, getInnerTrackProps, getInputProps, getRootProps, getThumbProps, getTrackProps } = useRangeSlider({
    name: field.name,
    min: valueRange[0],
    max: valueRange[1],
    defaultValue,
    onChange: (value) => {
      setFieldValue(field.name, value);
    },
  });

  const { ...thumbPropsFirstIndex } = getThumbProps({
    index: 0,
  });

  const { ...thumbPropsSecondIndex } = getThumbProps({
    index: 1,
  });

  return (
    <Box id={field.name}>
      <FormLabel> {formLabel} </FormLabel>
      <chakra.div cursor="pointer" {...getRootProps()}>
        <input {...getInputProps({ index: 0 })} hidden />
        <input {...getInputProps({ index: 1 })} hidden />
        <Box h="5px" bgColor="orange.100" borderRadius="full" {...getTrackProps()}>
          <Box h="5px" bgColor="orange" borderRadius="full" {...getInnerTrackProps()} />
        </Box>
        <Thumb value={state.value[0]} thumbIndex={0} thumbProps={thumbPropsFirstIndex} />
        <Thumb value={state.value[1]} thumbIndex={1} thumbProps={thumbPropsSecondIndex} />
      </chakra.div>
    </Box>
  );
}
