import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ClassRoomVideo from "./sections/ClassRoomVideo";
import ClassRoomSideBar from "./sections/ClassRoomSideBar";
import { useParams } from "react-router-dom";

function ClassRoomPage() {
  const { userId, courseId } = useParams<{ userId: string, courseId: string }>(); // useParams 훅을 사용하여 classId 받아오기
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Flex h={"100vh"} flexDirection={{ base: "column", "2xl": "row" }}>
      <Box className="class-video" flex={1}>
        <ClassRoomVideo userId = {userId} courseId={courseId} /> {/* classId를 ClassRoomVideo 컴포넌트로 전달 */}
      </Box>
      <Box
        className="class-side-menu"
        h={"100%"}
        bg={"gray.900"}
        w={{ "2xl": "500px" }}
        flex={{ base: "1", "2xl": "none" }}
      >
        <ClassRoomSideBar courseId={courseId} userId={userId} /> 
      </Box>
    </Flex></>
  );
}

export default ClassRoomPage;
