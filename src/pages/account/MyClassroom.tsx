import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MyClassInfo: MyClassDataType[] = [
  {
    title: "언리얼 리얼타임 렌더링으로 확장하는 Automotive 시네마틱",
    speaker: "3D 아티스트 조영조",
    startDateTime: "2023-07-24 12:00:00",
    endDateTime: null,
    imgSrc: "/images/7.png",
  },
  {
    title: "촬영 파이프라인으로 완성하는 언리얼 시네마틱 영상 연출",
    speaker: "언리얼 크리에이터",
    startDateTime: "2023-07-24 12:00:00",
    endDateTime: "2023-07-24 12:00:00",
    imgSrc: "/images/8.png",
  },
];

interface MyClassDataType {
  title: string | null;
  speaker: string | null;
  startDateTime: string | null;
  endDateTime: string | null;
  imgSrc: string;
}

function MyClassroom() {
  const navigate = useNavigate();

  const MyClass = ({
    title,
    speaker,
    startDateTime,
    endDateTime,
    imgSrc,
  }: MyClassDataType) => (
    <Card borderRadius={5}>
      <CardBody>
        <Flex flexDirection={"column"} gap={5}>
          <Flex
            justifyContent={"space-around"}
            flex={"1 1"}
            alignItems={"center"}
          >
            <Box
              className="class-card-thumbnail"
              w={"85px"}
              h={"85px"}
              as={"picture"}
              pr={3}
            >
              <Image src={imgSrc} w={"100%"} h={"100%"} />
            </Box>
            <Flex flexDirection={"column"} w={"200px"} gap={2}>
              <Heading size={"sm"}>{title}</Heading>
              <Text>{speaker}</Text>
            </Flex>
          </Flex>
          <Flex
            bg={"gray.100"}
            flexDirection={"column"}
            gap={2}
            p={3}
            borderRadius={5}
            alignItems={"center"}
          >
            <Text fontSize={"sm"}>시작일: {startDateTime}</Text>
            <Text fontSize={"sm"}>
              종료일: {endDateTime === null ? "None" : endDateTime}
            </Text>
          </Flex>
          <Button
            colorScheme="teal"
            onClick={() => navigate("/classroom/1")}
            fontSize={"sm"}
          >
            수강하기
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
  return (
    <Box h={"100%"}>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {MyClassInfo.map((item, index) => (
          <MyClass key={index} {...item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MyClassroom;
