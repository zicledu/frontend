import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  EditIcon,
  LinkIcon,
  RepeatClockIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

const IconDesc = ({ icon, desc }: { icon: ReactNode; desc: string }) => (
  <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
    <Box p={3} bg={"gray"} borderRadius={15} display={"inline-block"}>
      {icon}
    </Box>
    <Text mt={3} fontSize="xs" fontWeight={"bold"}>
      {desc}
    </Text>
  </Box>
);

const ClassDetailInfo = ({ icon, desc }: { icon: ReactNode; desc: string }) => (
  <Flex alignItems={"center"} gap={2}>
    {icon}
    <Text color={"white"} fontSize={"sm"}>
      {desc}
    </Text>
  </Flex>
);

function ClassSummary() {
  return (
    <>
      <Flex justifyContent={"center"}>
        <Box as="picture">
          <Image src={"/images/10.png"} maxH={"500px"} />
        </Box>
      </Flex>
      <Flex justifyContent={"center"} p={10}>
        <Flex
          flexDirection={"column"}
          w={"340px"}
          gap={5}
          alignContent={"center"}
        >
          <Box textAlign={"center"}>
            <Heading color={"white"} size="md" px={3}>
              Unreal Engine
            </Heading>
            <Text fontSize="lg" color={"white"} p={2}>
              SJ LEE
            </Text>
          </Box>
          <Flex
            color={"white"}
            gap={3}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconDesc icon={<RepeatIcon />} desc={"평생시청"} />
            <IconDesc icon={<LinkIcon />} desc={"쿠폰할인"} />
            <IconDesc icon={<CheckCircleIcon />} desc={"수강가능"} />
          </Flex>
          <Flex color={"white"} justifyContent={"space-between"}>
            <Text>판매가</Text>
            <Text>273,000원</Text>
          </Flex>
          <Divider color={"gray"} />
          <Text color={"white"} fontSize={"sm"}>
            * 상품별 유의사항을 하단에서 반드시 확인해주세요.
          </Text>
          <Flex flexDirection={"column"} gap={4} pt={3}>
            <Heading color={"white"} size="md">
              클래스 상세 정보
            </Heading>
            <ClassDetailInfo
              icon={<RepeatClockIcon w={4} h={4} color={"gray"} />}
              desc={"수강가능"}
            />
            <ClassDetailInfo
              icon={<EditIcon w={4} h={4} color={"gray"} />}
              desc={" 총 100회 49시간 12분"}
            />
            <ClassDetailInfo
              icon={<RepeatClockIcon w={4} h={4} color={"gray"} />}
              desc={"강의자료 포함"}
            />
          </Flex>
          <Flex gap={2}>
            <Tag colorScheme={"teal"}>언리얼엔진</Tag>
            <Tag colorScheme={"teal"}>게임</Tag>
            <Tag colorScheme={"teal"}>초보자</Tag>
          </Flex>
          <Button colorScheme={"teal"}>구매하기</Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ClassSummary;
