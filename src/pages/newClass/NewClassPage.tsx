import React, { ReactNode, useEffect, useState } from "react";
import ContentArea from "../../components/ContentArea";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config";
import ClassCard from "../../components/ClassCard";
import SectionTitle from "../../components/SectionTitle";

function NewClassPage() {
  const navigate = useNavigate();  
  const [newResults, setNewResults] = useState<CourseInfo[]>([]);
  
  type CourseInfo = {
    title: string;
    description: string;
    classId: number;
    thumbnailPath: string;
    courseId: number;
  };
  
  // 서버에서 최신의 결과를 가져오는 함수
  const handleNew = () => {
    axios.get(API.COURSE_LIST_BY_NEW)
      .then((response) => {
        setNewResults(response.data.data); // 최신의 결과를 state에 저장
      })
      .catch((error) => {
        console.error('Error fetching new results', error);
      });
  };

  // 페이지 로드 시 최고의 결과와 최신의 결과를 가져오는 useEffect
  useEffect(() => {
    handleNew();
  }, []);

  const ClassCardList = ({ children }: { children: ReactNode }) => (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3 }}
      spacing={5}
      gridAutoRows={"1fr"}
      borderColor={"none"}
    >
      {children}
    </SimpleGrid>
  );

  return (
    <ContentArea minHeight={"calc(100vh - 2.5em)"}>
      <Heading p={5} color={"white"}>
        신규 클래스
      </Heading>
      <Flex
        flexDirection={"column"}
        className={"content-wrapper"}
        p={4}
        width={"100%"}
        gap={4}
      >
        <Box>
          <SectionTitle title={"New"} />
          <ClassCardList>
            {newResults.map((item, idx) => (
              <ClassCard
                key={idx}
                title={item.title}
                desc={item.description}
                onClick={() => navigate(`/class/${item.courseId}`)}
                imgSrc={item.thumbnailPath}
              />
            ))}
          </ClassCardList>
        </Box>
      </Flex>
    </ContentArea>
  );
}

export default NewClassPage;
