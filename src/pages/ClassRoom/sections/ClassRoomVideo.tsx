import React from "react";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function ClassRoomVideo() {
  const navigate = useNavigate();
  return (
    <>
      <Flex h={"60px"} bg={"gray.800"} alignItems={"center"} gap={3} p={3}>
        <IconButton
          aria-label="back"
          icon={<ArrowBackIcon />}
          bg={"gray.700"}
          color={"white"}
          size="sm"
          onClick={() => navigate("/account/classroom")}
        />
        <Heading size="sm" color={"white"}>
          언리얼 리얼타임 렌더링으로 확장하는 Automotive 시네마틱
        </Heading>
      </Flex>
      <Box height={"calc(100% - 60px)"}>
        <iframe
          width={"100%"}
          height={"100%"}
          title="js"
          src="https://www.youtube.com/embed/W6NZfCO5SIk"
        />
      </Box>
    </>
  );
}

export default ClassRoomVideo;
