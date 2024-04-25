import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, OrderedList, ListItem } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom"
import { API } from "../../../../config";

interface classCurriculumProps {
  courseId: string;
}


function Curriculum({courseId}: classCurriculumProps) {
  const [courseContent, setCourseContent] = useState<CourseContent[]>([]);

  useEffect(() => {
    const fetchData = async () => {


      try {
        const response = await axios.get(API.CLASS_CURRICULUM.replace("courseId", courseId ?? ""));
        if (response.status === 200) {
          const data = response.data.data;
          setCourseContent(data.sort((a: any, b: any) => a.order - b.order)); // order 순서대로 정렬
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
      }
    };

    fetchData();
  },[courseId]);

  return (
    <Box h={"100%"}>
      <Heading color={"teal"} fontSize={"md"} textAlign={"center"} py={5}>
        커리큘럼
      </Heading>
      <Box p={6}>
        <Flex flexDirection={"column"} gap={1}>
          <OrderedList>
            {courseContent.map((content) => (
              <Box key={content.id} p={3} bg={"gray.100"} borderRadius={5} >
                  <ListItem ml={7} >{content.title}</ListItem>
              </Box>
            ))}
          </OrderedList>
        </Flex>
      </Box>
    </Box>
  );
}

export default Curriculum;

interface CourseContent {
  id: number;
  title: string;
  runTime: string;
  order: number;
}
