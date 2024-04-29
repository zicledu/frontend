import { useEffect, useRef, useState } from "react";
import { Box, Container, Flex, Text, Progress } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ContentBox from "../ContentBox";

const SliderContentInfo = [
  {
    image: "../../public/images/main1.png"
  },
  {

    image: "../../public/images/main2.png"
  },
  {

    image: "../../public/images/main3.png"
  },
  {

    image: "../../public/images/main4.png"
  },
  {

    image: "../../public/images/main5.png"
  },
];

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideLength = SliderContentInfo.length;

  useEffect(() => {
    const time = setTimeout(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slideLength);
    }, 3000);
    return () => {
      clearInterval(time);
    };
  }, [currentSlide, slideLength]);

  const handleClickPrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? slideLength - 1 : prevSlide - 1));
  };

  const handleClickNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slideLength);
  };

  return (
    <Box ref={sliderRef} className="slider" h="400px">
      <Box h="100%" background={`url(${SliderContentInfo[currentSlide].image})`} backgroundSize="cover">
        <ContentBox h="100%">
          <Flex
            h="100%"
            flexDirection="column"
            p={4}
            justify="end"
            gap={4}
          >
            <Flex alignItems="center">
              <Box w="100%">
                <Text color="gray.300" as="span">
                  <ChevronLeftIcon
                    boxSize={8}
                    onClick={handleClickPrevSlide}
                    _hover={{
                      color: "white",
                    }}
                  />
                </Text>
                <Text color="white" fontSize="md" as="span">
                  {`${currentSlide + 1} / ${slideLength}`}
                </Text>
                <Text color="gray.300" as="span">
                  <ChevronRightIcon
                    boxSize={8}
                    onClick={handleClickNextSlide}
                    _hover={{
                      color: "white",
                    }}
                  />
                </Text>
              </Box>
            </Flex>
          </Flex>
        </ContentBox>
      </Box>
    </Box>
  );
};

export default Slider;
