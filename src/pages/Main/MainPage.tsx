import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Flex, SimpleGrid, Input, Button, IconButton, useColorModeValue, background } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import axios from "axios";
import Slider from "../../components/Slider";
import ClassCard from "../../components/ClassCard";
import SectionTitle from "../../components/SectionTitle";
import ContentArea from "../../components/ContentArea";
// 강의 정보에 대한 타입 정의
type CourseInfo = {
  title: string;
  description: string;
  classId: number;
  thumbnailPath: string;
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

function MainPage() {
  const navigate = useNavigate();
  // 최고의 결과를 저장할 상태
  const [bestResults, setBestResults] = useState<CourseInfo[]>([]);
  // 최신의 결과를 저장할 상태
  const [newResults, setNewResults] = useState<CourseInfo[]>([]);
  // 검색 결과를 저장할 상태
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([])

  // 페이지 로드 시 최고의 결과와 최신의 결과를 가져오는 useEffect
  useEffect(() => {
    handleBest();
    handleNew();
  }, []); // 페이지가 로드될 때 한 번만 실행
// 서버에서 최고의 결과를 가져오는 함수
const handleBest = () => {
  axios.get('http://localhost:8080/course/best')
  .then((response) => {
    setBestResults(response.data.data); // 최고의 결과를 state에 저장
  })
  .catch((error) => {
    console.error('Error fetching best results', error);
  });
};

// 서버에서 최신의 결과를 가져오는 함수
const handleNew = () => {
  axios.get('http://localhost:8080/course/new')
  .then((response) => {
    setNewResults(response.data.data); // 최신의 결과를 state에 저장
  })
  .catch((error) => {
    console.error('Error fetching new results', error);
  });
};

  const handleSearch = () => {
    axios.get('http://localhost:8080/course/search', {
      params: {
        keyword: keyword
      }
    })
    .then((response) => {
      setSearchResults(response.data);
    })
    .catch((error) => {
      console.error('Error fetching search results', error);
    });
  };

  return (
    <>
      <Slider />
      <ContentArea>
        <Flex
          flexDirection={"column"}
          className={"content-wrapper"}
          p={4}
          width={"100%"}
          gap={4}
        >
          <Box mx="auto" width="50%">
            <Flex align="center" justify="center">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                style={{ padding: "8px", fontSize: "16px", borderRadius: "999px", width: "100%", paddingLeft: "20px" }}
                />
                <Button 
                  onClick={handleSearch}
                  borderRadius="full"
                  bgColor={useColorModeValue("gray.200", "gray.700")}
                  _hover={{ bgColor: useColorModeValue("gray.300", "gray.600")}}
                  ml={2}
                >
                  <SearchIcon />
                 </Button>
              </Flex>
          </Box>
          <Box>
            <SectionTitle title={"BEST"} />
            <ClassCardList>
              {bestResults.map((item, idx) => (
                <ClassCard
                  key={idx}
                  title={item.title}
                  desc={item.description}
                  onClick={() => navigate(`/class/${item.classId}`)}
                  imgSrc={item.thumbnailPath}
                />
              ))}
            </ClassCardList>
          </Box>
          
          <Box>
            <SectionTitle title={"New"} />
            <ClassCardList>
              {newResults.map((item, idx) => (
                <ClassCard
                  key={idx}
                  title={item.title}
                  desc={item.description}
                  onClick={() => navigate(`/class/${item.classId}`)}
                  imgSrc={item.thumbnailPath}
                />
              ))}
            </ClassCardList>
          </Box>
          
        </Flex>
      </ContentArea>
    </>
  );
}


export default MainPage;
