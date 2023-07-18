import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { MdCircle } from "react-icons/md";

import { ResRecipe } from "../type";

export function Results() {
  const location = useLocation();
  const formData = location.state;
  const [results, setResults] = useState<ResRecipe>();

  useEffect(() => {
    axios.post("/api/v1/quest", formData).then((res) => {
      setResults(res.data);
    });
  }, [formData]);

  return (
    <VStack paddingY={10} gap={10}>
      <Card align="center" bgColor="beige" w="90vh">
        <CardHeader>
          <Heading size="lg" color="green.600" fontWeight="semibold" letterSpacing="wide">
            {results?.recipeName}
          </Heading>
        </CardHeader>
        <CardBody gap={5} color="gray.500" fontWeight="semibold" letterSpacing="wide">
          <Flex align="center" gap={2}>
            <Flex gap={1}>{results?.cuisineType}</Flex>|
            <Flex gap={1}>
              <TimeIcon w={5} h={5} /> {results?.totalTime} mins
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <Flex gap={10} height="50vh">
        <TableContainer>
          <Table
            padding={10}
            variant="simple"
            size="sm"
            bg="beige"
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
          >
            <Thead>
              <Tr>
                <Th> INFO </Th>
                <Th> PER MEAL </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td> Preparing Time</Td>
                <Td isNumeric> {results?.prepTime} </Td>
              </Tr>
              <Tr>
                <Td> Cooking Time </Td>
                <Td isNumeric> {results?.cookTime} </Td>
              </Tr>
              <Tr>
                <Td> Servings </Td>
                <Td isNumeric> {results?.servings} </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Divider orientation="vertical" />

        <Flex direction="column" gap={5}>
          <Box>
            <Heading p={1} size="md" color="green.600" bgColor="beige" fontWeight="semibold" letterSpacing="wide">
              Ingredients
            </Heading>

            <List p={2}>
              {results?.ingredients.map((el, i) => (
                <ListItem key={i}>
                  <ListIcon as={MdCircle} h={3} color="green.300" />
                  {el}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Heading p={1} size="md" color="green.600" bgColor="beige" fontWeight="semibold" letterSpacing="wide">
              {" "}
              Instructions{" "}
            </Heading>
            <List p={2}>
              <OrderedList>
                {results?.instructions.map((el, i) => (
                  <ListItem key={i}>{el}</ListItem>
                ))}
              </OrderedList>
            </List>
          </Box>
        </Flex>
      </Flex>
    </VStack>
  );
}
