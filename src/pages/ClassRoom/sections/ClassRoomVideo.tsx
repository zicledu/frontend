import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../../config";

type MyCourseInfo = {
  title: string;
  lectureOrder: number;
  durationMinutes: string;
  videoPath720: string;
  videoPath1080: string;
  videoPathOriginal: string;
  thumbnailPath: string;
};




function ClassRoomVideo() {
  const navigate = useNavigate();
  const [courseResults, setCourseResults] = useState<MyCourseInfo[]>([]);
  const handleCourseList = () => {
    axios.get(API.MY_COURSE_LIST)
    .then((response) => {
      setCourseResults(response.data.data); // 최고의 결과를 state에 저장
    })
    .catch((error) => {
      console.error('Error fetching courseList results', error);
    });
  };
  
  useEffect(() => {
    handleCourseList();
  }, []);
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
          {courseResults.length > 0 && courseResults[0].title}
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
