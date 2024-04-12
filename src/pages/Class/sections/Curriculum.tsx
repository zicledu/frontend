import React from "react";
import { Box, Flex, Heading, OrderedList, ListItem } from "@chakra-ui/react";

function Curriculum() {
  return (
    <Box h={"100%"}>
      <Heading color={"teal"} fontSize={"md"} textAlign={"center"} py={5}>
        커리큘럼
      </Heading>
      <Box p={6}>
        <Flex flexDirection={"column"} gap={3}>
          <Box p={4} bg={"gray.100"} borderRadius={5}>
            <OrderedList spacing={3}>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>

              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </OrderedList>
          </Box>
          <Box p={4} bg={"gray.100"} borderRadius={5}>
            <OrderedList spacing={3}>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </OrderedList>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Curriculum;
