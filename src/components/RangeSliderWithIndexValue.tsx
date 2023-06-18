import { Flex, Box, Text, chakra, useRangeSlider } from "@chakra-ui/react";
interface ThumbProps {
  value: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
interface RangeSliderProps {
  min: number;
  max: number;
  defaultValue: [number, number];
}

export function RangeSliderWithIndexValue({ min, max, defaultValue }: RangeSliderProps) {
  const { state, getInnerTrackProps, getInputProps, getRootProps, getThumbProps, getTrackProps } = useRangeSlider({
    min,
    max,
    defaultValue,
  });

  const { ...thumbPropsFirstIndex } = getThumbProps({
    index: 0,
  });

  const { ...thumbPropsSecondIndex } = getThumbProps({
    index: 1,
  });

  return (
    <Box>
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
