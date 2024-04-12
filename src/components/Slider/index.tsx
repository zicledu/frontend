import { useEffect, useRef, useState } from "react";
import { Box, Container, Flex, Text, Progress } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ContentBox from "../ContentBox";

const SliderContentInfo = [
  {
    subtitle: "첫번째 소제목 입니다",
    title: "첫번째 메인 타이틀입니다.",
    bg: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
  },
  {
    subtitle: "두번째 소제목 입니다",
    title: "두번째 메인 타이틀입니다.",
    bg: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  },
  {
    subtitle: "세번째 소제목 입니다",
    title: "세번째 메인 타이틀입니다.",
    bg: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
  },
  {
    subtitle: "네번째 소제목 입니다",
    title: "네번째 메인 타이틀입니다.",
    bg: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,241,29,1) 50%, rgba(252,176,69,1) 100%)",
  },
  {
    subtitle: "다섯번째 소제목 입니다",
    title: "다섯번째 메인 타이틀입니다.",
    bg: "linear-gradient(blue, red)",
  },
];

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideLength, setSlideLength] = useState<number>(5);

  useEffect(() => {
    const time = setTimeout(() => {
      if (currentSlide === slideLength - 1) setCurrentSlide(0);
      else setCurrentSlide((prevState) => prevState + 1);
    }, 3000);
    return () => {
      clearInterval(time);
    };
  }, [currentSlide]);

  const handleClickPrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slideLength - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClickNextSlide = () => {
    if (currentSlide === 4) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <Box ref={sliderRef} className={"slider"} h={"400px"}>
      <Box h={"100%"} background={SliderContentInfo[currentSlide].bg}>
        <ContentBox h={"100%"}>
          <Flex
            h={"100%"}
            flexDirection={"column"}
            p={4}
            justify={"end"}
            gap={4}
          >
            <Text color={"white"} fontSize="sm">
              {SliderContentInfo[currentSlide].subtitle}
            </Text>
            <Text color={"white"} fontSize="3xl" fontWeight={"bold"}>
              {SliderContentInfo[currentSlide].title}
            </Text>
            <Flex alignItems={"center"}>
              <Box w={"100%"}>
                <Text color={"gray.300"} as={"span"}>
                  <ChevronLeftIcon
                    boxSize={8}
                    onClick={handleClickPrevSlide}
                    _hover={{
                      color: "white",
                    }}
                  />
                </Text>
                <Text color={"white"} fontSize="md" as={"span"}>
                  {`${currentSlide + 1} / ${slideLength}`}
                </Text>
                <Text color={"gray.300"} as={"span"}>
                  <ChevronRightIcon
                    boxSize={8}
                    onClick={handleClickNextSlide}
                    _hover={{
                      color: "white",
                    }}
                  />
                </Text>
              </Box>
              {/*<Progress value={80} w={"90%"} />*/}
            </Flex>
          </Flex>
        </ContentBox>
      </Box>
    </Box>
  );
};

export default Slider;
