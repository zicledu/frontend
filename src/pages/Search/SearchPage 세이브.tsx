import React, { ReactNode, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Box, Container, Flex, SimpleGrid, Input, Button, IconButton, useColorModeValue, background } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import { Text } from "@chakra-ui/react";
import axios from "axios";
import ClassCard from "../../components/ClassCard";
import SectionTitle from "../../components/SectionTitle";
import ContentArea from "../../components/ContentArea";
import { API } from "../../../config"

// 검색 정보에 대한 타입 정의
type CourseSearchInfo = {
  title: string;
  description: string;
  courseId: number;
  thumbnailPath: string;
  tags: string;
  userName: string;
}

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

function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<CourseSearchInfo[]>([]);
  // 검색 결과를 저장할 상태
  const [keyword, setKeyword] = useState<string>("");
  const [allResults, setAllResults] = useState<CourseSearchInfo[]>([]);
  const [searchParams] = useSearchParams();

  //전체 강의
  const handleAll = () => {
    axios.get(`${API.COURSE_LIST_BY_SEARCH}?keyword=`)
    .then((response) => {
      setAllResults(response.data.data);
    })
    .catch((error) => {
      console.error('Error fetching all results', error);
    });
  };

  useEffect(() => {
    handleAll();
    const keywordFromParams = searchParams.get("keyword");
    if (keywordFromParams) {
      setKeyword(keywordFromParams);
      handleSearch(keywordFromParams);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  };

// 강의 검색
const handleSearch = async (keyword: string) => {
  try {
    if (keyword.trim() === '') {
      // 검색어가 비어있는 경우 전체 강의를 보여주는 API 호출
      navigate("/search");
      window.location.reload();
      return;
    }

    const response = await fetch(`${API.COURSE_LIST_BY_SEARCH}?keyword=${keyword}`);
    const data = await response.json();

    if (data.data) {
      setSearchResults(data.data);
    } else {
      console.error('검색 결과가 없습니다.');
      setSearchResults([]);
    }
    navigate(`/search?keyword=${keyword}`);

  } catch (error) {
    console.error('검색 중 오류가 발생했습니다:', error);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(keyword);
    }
  };

  return (
    <>
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
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              style={{ padding: "8px", fontSize: "16px", borderRadius: "999px", width: "100%", paddingLeft: "20px" }}
            />
            <Button 
              onClick={() => handleSearch(keyword)}
              borderRadius="full"
              bgColor={useColorModeValue("gray.200", "gray.700")}
              _hover={{ bgColor: useColorModeValue("gray.300", "gray.600")}}
              ml={2}
            >
              <SearchIcon />
            </Button>
          </Flex>
        </Box>
        {/* 검색 결과를 보여줄지 여부를 조건부 렌더링으로 설정 */}
        {searchResults.length > 0 ? (
          <Box>
            <SectionTitle title={"검색 결과"} />
            <ClassCardList>
              {searchResults.map((item, idx) => (
                <ClassCard
                  key={idx}
                  title={item.title}
                  desc={item.description}
                  onClick={() => navigate(`/class/${item.courseId}`)}
                  imgSrc={item.thumbnailPath}
                />
              ))}
            </ClassCardList>
            <Box mt={250} />
          </Box>
        ) : (
          <Box>
            {/* 전체 강의 목록을 보여줄 카드 리스트 */}
            <SectionTitle title={"전체 강의"} />
            <ClassCardList>
              {allResults.map((item, idx) => (
                <ClassCard
                  key={idx}
                  title={item.title}
                  desc={item.description}
                  onClick={() => navigate(`/class/${item.courseId}`)}
                  imgSrc={item.thumbnailPath}
                />
              ))}
            </ClassCardList>
            <Box mt={250} />
          </Box>
        )}
      </Flex>
    </ContentArea>
    </>
  );
}


export default SearchPage;
