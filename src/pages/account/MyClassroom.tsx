import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config"


interface MyClassDataType {
  id: number;
  courseTitle: string;
  instructor: string;
  enrolledAt: string;
  thumbnailPath: string;
  userId: string;
}

function MyClassroom() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [myClasses, setMyClasses] = useState<MyClassDataType[]>([]);
 

  useEffect(() => {
    const fetchData = async () => {
      if (userId !== "null") { // userId가 "null"이 아닌 경우에만 데이터를 가져옴
        if (userId !== localStorage.getItem("userId")) {
          navigate("/error/401");
          return;
        }

        try {
          const response = await axios.get(
            API.COURSE_LIST_BY_USERID.replace("userId", userId ?? ""),
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("idToken")
              }
            }
          );
          setMyClasses(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        window.alert("로그인 후 이용해주세요");
        navigate("/login");
      }
    };

    fetchData();
  }, [userId]); // userId가 변경될 때마다 다시 호출

  const handleClassClick = (courseId: number) => {
    console.log(`/classroom/${userId}/${courseId}`);
    navigate(`/classroom/${userId}/${courseId}`);
  };

  return (
    <Box h={"100%"}>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {myClasses.map((myClass) => (
          <Card key={myClass.id} borderRadius={5}>
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
                    <Image src={myClass.thumbnailPath} w={"100%"} h={"100%"} />
                  </Box>
                  <Flex flexDirection={"column"} w={"200px"} gap={2}>
                    <Heading size={"sm"}>{myClass.courseTitle}</Heading>
                    <Text>{myClass.instructor}</Text>
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
                  <Text fontSize={"sm"}>수강일: {myClass.enrolledAt}</Text>
                </Flex>
                <Button
                  colorScheme="teal"
                  onClick={() => handleClassClick(myClass.id)}
                  fontSize={"sm"}
                >
                  수강하기
                </Button>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MyClassroom;