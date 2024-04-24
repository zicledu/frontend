import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Text,
  Divider,
  Button,
  Link, // Link 컴포넌트 추가
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EmailIcon } from "@chakra-ui/icons";
import { API } from "../../../../config";

interface ClassSpeakerInfoProps {
  courseId: string;
}

function SpeakerInfo({courseId}: ClassSpeakerInfoProps) {
  const [instructor, setInstructor] = useState<any>(null);
  

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(API.CLASS_INSTRUCTOR.replace("courseId", courseId ?? ""));
        if (response.status === 200) {
          const data = response.data;
          setInstructor(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[courseId]);

  return (
    <Box h={"100%"}>
      <Heading color={"teal"} fontSize={"md"} textAlign={"center"} py={5}>
        연사 소개
      </Heading>
      {instructor && (
        <Flex p={5} gap={5}>
          <Box w={"200px"} textAlign={"center"}>
            <Avatar size="2xl" src="https://bit.ly/broken-link" />
          </Box>
          <Flex flex={1} flexDirection={"column"} gap={3}>
            <Heading fontSize={"xl"}>{instructor.userName}</Heading>
            <Divider color={"lightgray"} />
            <Flex alignItems="center">
              <EmailIcon />
              <Heading fontSize="md" ml={2}>
                {instructor.email}
              </Heading>
            </Flex>
            <Heading fontSize="md">
                등록 강의 수 : {instructor.enrollmentCount}
              </Heading>
            
              <Button colorScheme='twitter' variant='link' w={55} margin={0} justifyContent={"left"}>
                프로필
              </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

export default SpeakerInfo;
