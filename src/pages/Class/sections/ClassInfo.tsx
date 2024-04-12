import React from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Highlight,
} from "@chakra-ui/react";

const steps = [
  { title: "First", description: "HTML" },
  { title: "Second", description: "CSS" },
  { title: "Third", description: "Javascript" },
];

function ClassInfo() {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-around"}
      p={10}
      // bg={"gray.900"}
      h={"100%"}
      gap={7}
    >
      <Box>
        <Heading lineHeight="tall" color={"white"}>
          <Highlight
            query="필수 역량"
            styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
          >
            토스, 당근, XL8 소속 개발자의 경험에서 배우는 필수 역량
          </Highlight>
        </Heading>
      </Box>
      <Box>
        <Text color={"gray"} lineHeight={7}>
          해결되지 않는 버그, 아쉬운 코드 퀄리티, 구성원이 쓰지 않는
          디자인시스템, 매번 반복하는 실수를 경험해보신 적 있으신가요? 다음
          단계로 나아가기 위해 필요한 핵심 역량은 ‘문제 해결 역량’ 입니다.{" "}
          <br /> 실제 사례와 경험을 기반으로 프론트엔드 주니어 개발자가 미드레벨
          개발자로 성장하기 위해 꼭 알아야 할 다양한 인사이트, 지금 공개합니다.
        </Text>
      </Box>
      <Box py={3} color={"white"}>
        <Stepper index={1} colorScheme="teal" size={"lg"}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    </Flex>
  );
}

export default ClassInfo;
