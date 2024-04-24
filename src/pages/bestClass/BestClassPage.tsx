import ContentArea from "../../components/ContentArea";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../config";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import ClassCard from "../../components/ClassCard";

function BestClassPage() {
  const navigate = useNavigate();
  // 최고의 결과를 저장할 상태
  const [bestResults, setBestResults] = useState<CourseInfo[]>([]);

  type CourseInfo = {
    title: string;
    description: string;
    classId: number;
    thumbnailPath: string;
    courseId: number;
  };

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

  // 페이지 로드 시 최고의 결과와 최신의 결과를 가져오는 useEffect
  useEffect(() => {
    handleBest();
  }, []); // 페이지가 로드될 때 한 번만 실행

  // 서버에서 최고의 결과를 가져오는 함수
  const handleBest = () => {
    axios.get(API.COURSE_LIST_BY_BEST)
      .then((response) => {
        setBestResults(response.data.data); // 최고의 결과를 state에 저장
      })
      .catch((error) => {
        console.error('Error fetching best results', error);
      });
  };

  return (
    <ContentArea minHeight={"calc(100vh - 2.5em)"}>
      <Heading p={5} color={"white"}>
        MONSTERA BEST
      </Heading>
      <Flex
        flexDirection={"column"}
        className={"content-wrapper"}
        p={4}
        width={"100%"}
        gap={4}
      >
        <Box>
          <SectionTitle title={"BEST"} />
          <ClassCardList>
            {bestResults.map((item, idx) => (
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

export default BestClassPage;
