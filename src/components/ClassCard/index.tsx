import React from "react";
import {
  Box,
  Heading,
  HStack,
  Tag,
  Text,
  Card,
  CardBody,
  CardProps,
  Stack,
  Image,
} from "@chakra-ui/react";

export interface ClassCardProps extends CardProps {
  title: string;
  desc: string;
  imgSrc: string;
}

function ClassCard({ title, desc, imgSrc, ...props }: ClassCardProps) {
  const { onClick } = props;
  return (
    <Card
      onClick={onClick}
      _hover={{ transform: "translateY(-7px)" }}
      transition="transform 0.3s ease"
      direction={{ base: "row", sm: "column" }}
      bg={"#393939"}
      className={"card"}
      px={{ base: 2, sm: 0 }}
      cursor={"pointer"}
    >
      <Box
        className="class-card-thumbnail"
        w={{ base: "100px", sm: "100%" }}
        flexShrink={0}
        alignContent={"center"}
      >
        <Image className="class-card-thumbnail" src={imgSrc} />
      </Box>
      <Stack>
        <CardBody p={{ base: 3, sm: 4 }} alignItems="stretch">
          <HStack spacing={2} pb={2}>
            <Tag variant="solid" colorScheme="teal">
              수강 가능
            </Tag>
            <Tag>캐릭터</Tag>
          </HStack>
          <Heading size="sm" h={{ sm: "48px" }} color={"white"}>
            {title}
          </Heading>
          <Text color={"white"}>{desc}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default ClassCard;
