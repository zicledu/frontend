import React from "react";
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";

function SpeakerInfo() {
  return (
    <Box h={"100%"}>
      <Heading color={"teal"} fontSize={"md"} textAlign={"center"} py={5}>
        연사 소개
      </Heading>
      <Flex p={5} gap={5}>
        <Box w={"200px"} textAlign={"center"}>
          <Avatar size="2xl" src="https://bit.ly/broken-link" />
        </Box>
        <Flex flex={1} flexDirection={"column"} gap={3}>
          <Heading fontSize={"xl"}>YMG</Heading>
          <Divider color={"lightgray"} />
          <Text>대한민국 출신</Text>
          <Text>안녕하세요. 강사 소개란입니다.</Text>
          <Button colorScheme="teal" w={"150px"}>
            BLOG
          </Button>
        </Flex>
      </Flex>
      <Flex p={5} gap={5}>
        <Box w={"200px"} textAlign={"center"}>
          <Avatar size="2xl" src="https://bit.ly/broken-link" />
        </Box>
        <Flex flex={1} flexDirection={"column"} gap={3}>
          <Heading fontSize={"xl"}>LSJ</Heading>
          <Divider color={"lightgray"} />
          <Text>대한민국 출신</Text>
          <Text>안녕하세요. 강사 소개란입니다.</Text>
          <Button colorScheme="teal" w={"150px"}>
            BLOG
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SpeakerInfo;
