import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Flex, SimpleGrid, Input, Button, IconButton, useColorModeValue, background } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import axios from "axios";
import Slider from "../../components/Slider";
import ClassCard from "../../components/ClassCard";
import SectionTitle from "../../components/SectionTitle";
import ContentArea from "../../components/ContentArea";

const TempClassInfo = [
  {
    title: "Green Screen, RealTime VFX",
    desc: "Unreal Engine",
    classId: 1,
    imgSrc: "/images/1.png",
  },
  {
    title: "Filming in Green Screen",
    desc: "VIVEMARS",
    classId: 2,
    imgSrc: "/images/2.png",
  },
  {
    title: "Cosmic Horror",
    desc: "Unreal Engine",
    classId: 3,
    imgSrc: "/images/3.png",
  },
  {
    title: "Led wall Installation",
    desc: "Unreal Engine",
    classId: 4,
    imgSrc: "/images/4.png",
  },
  {
    title: "Led Wall Virtual Production",
    desc: "Unreal Engine",
    classId: 5,
    imgSrc: "/images/5.png",
  },
  {
    title: "ANAMORPHIC Garden",
    desc: "Unreal Engine",
    classId: 6,
    imgSrc: "/images/6.png",
  },
];

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

  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([])

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
              {TempClassInfo.map((item, idx) => (
                <ClassCard
                  key={idx}
                  title={item.title}
                  desc={item.desc}
                  onClick={() => navigate(`/class/${item.classId}`)}
                  imgSrc={item.imgSrc}
                />
              ))}
            </ClassCardList>
          </Box>
          <Box>
            <SectionTitle title={"신규 오픈 클래스"} />
            <ClassCardList>
              {TempClassInfo.map((item, idx) => (
                <ClassCard
                  key={idx}
                  title={item.title}
                  desc={item.desc}
                  onClick={() => navigate(`/class/${item.classId}`)}
                  imgSrc={item.imgSrc}
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

