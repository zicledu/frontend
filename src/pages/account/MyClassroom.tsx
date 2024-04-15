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

interface MyClassDataType {
  id: number;
  courseTitle: string;
  instructor: string;
  enrolledAt: string;
  thumbnailPath: string;
}

function MyClassroom() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [myClasses, setMyClasses] = useState<MyClassDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      if (userId !== localStorage.getItem("userId")) {
        navigate("/error/401");
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/course/${userId}`
        , {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("idToken")
            }
          }
       )
          
          ;
        setMyClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleClassClick = (classId: number) => {
    navigate(`/classroom/${classId}`);
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
