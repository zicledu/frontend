import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import ClassRoomVideo from "./sections/ClassRoomVideo";
import ClassRoomSideBar from "./sections/ClassRoomSideBar";

function ClassRoomPage() {
  return (
    <Flex h={"100vh"} flexDirection={{ base: "column", "2xl": "row" }}>
      <Box className="class-video" flex={1}>
        <ClassRoomVideo />
      </Box>
      <Box
        className="class-side-menu"
        h={"100%"}
        bg={"gray.900"}
        w={{ "2xl": "500px" }}
        flex={{ base: "1", "2xl": "none" }}
      >
        <ClassRoomSideBar />
      </Box>
    </Flex>
  );
}

export default ClassRoomPage;
