import { withRouter } from "next/router";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Card,
  CardHeader,
  CardBody,
  Heading,
  TableContainer,
  Thead,
  Tr,
  Table,
  Tbody,
  Td,
  Flex,
  VStack,
  Th,
  Divider,
  Box,
  Image,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { MdCircle } from "react-icons/md";

import type { ResultsRes } from "../type";

function Results(props: ResultsRes) {
  const results = JSON.parse(props.router.query.data);
  if (!results) return null;

  return (
    <VStack>
      <Box paddingY={5} width="1000px">
        <Card align="center" bgColor="beige">
          <CardHeader>
            <Heading size="lg" color="green.600" fontWeight="semibold" letterSpacing="wide">
              {results.recipeName}
            </Heading>
          </CardHeader>
          <CardBody color="gray.500" fontWeight="semibold" letterSpacing="wide">
            <Flex align="center" gap={2}>
              <Flex gap={1}>{results.cuisineType}</Flex>|
              <Flex gap={1}>
                <TimeIcon w={5} h={5} /> {results.totalTime} mins
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Box>

      <Box width="1000px">
        <Flex gap={5} height="container.lg">
          <TableContainer width="500px">
            <Table variant="simple" size="sm" bg="beige" color="gray.500" fontWeight="semibold" letterSpacing="wide">
              <Thead>
                <Tr>
                  <Th> INFO </Th>
                  <Th> PER MEAL </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td> Preparing Time</Td>
                  <Td isNumeric> {results.prepTime} </Td>
                </Tr>
                <Tr>
                  <Td> Cooking Time </Td>
                  <Td isNumeric> {results.cookTime} </Td>
                </Tr>
                <Tr>
                  <Td> Servings </Td>
                  <Td isNumeric> {results.servings} </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Divider orientation="vertical" />

          <Flex direction="column" gap={5}>
            <Image src={results.img} alt="Food Image" objectFit="cover" />
            <Box>
              <Heading
                p={1}
                size="md"
                color="green.600"
                bgColor="beige"
                fontWeight="semibold"
                letterSpacing="wide"
                w="700px"
              >
                Ingredients
              </Heading>

              <List p={2}>
                {results.ingredients.map((el: string, i: number) => (
                  <ListItem key={i}>
                    <ListIcon as={MdCircle} h={3} color="green.300" />
                    {el}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Heading p={1} size="md" color="green.600" bgColor="beige" fontWeight="semibold" letterSpacing="wide">
                Instructions
              </Heading>
              <List paddingY={2} paddingX={4}>
                <OrderedList>
                  {results.instructions.map((el: string, i: number) => (
                    <ListItem key={i}>{el}</ListItem>
                  ))}
                </OrderedList>
              </List>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </VStack>
  );
}

export default withRouter(Results);
