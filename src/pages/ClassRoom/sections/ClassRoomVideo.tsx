import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../../config";
import axios from "axios";

function ClassRoomVideo(props: { userId: any; courseId: any;}) {
   
  const { userId, courseId} = props;
  const navigate = useNavigate();
  const [lectureList, setLectureList] = useState<CourseInfo[]>([]);

  type CourseInfo = {
    title: string;
    description: string;
    classId: number;
    thumbnailPath: string;
    courseId: number;
    lectureOrder: number;
    durationMinutes: string;
    videoPath720: string;
    videoPath1080: string;
    videoPathOriginal: string;
  };

  useEffect(() => {
    handleCourse();
  }, []);

  const handleCourse = () => {
    axios
      .get(API.MY_COURSE_LIST.replace("userId", userId).replace("courseId", courseId), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("idToken"),
        },
      })
      .then((response) => {
        console.log("Course data received:", response.data.data);
        setLectureList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching lecture results", error);
      });
  };

  const firstLectureWithTitle = lectureList.find((lecture) => lecture.lectureOrder === 1)?.title;
  const firstLectureVideoPathOriginal = lectureList.find((lecture) => lecture.lectureOrder === 1)?.videoPathOriginal;
  const src = firstLectureVideoPathOriginal;
  console.log(src);

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
          {firstLectureWithTitle}
          
        </Heading>
      </Flex>
      <Box height={"calc(100% - 60px)"}>
        <video width={"100%"} height={"100%"} controls>
          <source src={src} type="video/mp4" />
        </video>
      </Box>
    </>
  );
}

export default ClassRoomVideo;
