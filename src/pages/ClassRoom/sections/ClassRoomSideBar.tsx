import React, { ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Heading,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

const ClassIndex = [
  {
    title: "오프닝 & 기초",
    classList: [
      { desc: "Section 1-1", time: 3 },
      { desc: "Section 1-2", time: 3 },
      { desc: "Section 1-3", time: 3 },
    ],
  },
  { title: "중간 단계", classList: [{ desc: "Section 2-1", time: 3 }] },
  { title: "심화 단계", classList: [{ desc: "Section 3-1", time: 3 }] },
];

interface TabContentBoxProps extends BoxProps {
  children: ReactNode;
}

const TabContentBox = ({ children, ...props }: TabContentBoxProps) => (
  <Box bg={"gray.700"} p={5} borderRadius={5} {...props}>
    {children}
  </Box>
);

function ClassRoomSideBar() {
  return (
    <>
      <Tabs size="md" h={"100%"} p={3}>
        <TabList>
          <Tab color={"teal.300"}>강의목차</Tab>
          <Tab color={"teal.300"}>강의자료</Tab>
          <Tab color={"teal.300"}>공지사항</Tab>
          <Tab color={"teal.300"}>노트</Tab>
        </TabList>
        <TabPanels bg={"gray.900"}>
          <TabPanel>
            <TabContentBox>
              <Accordion defaultIndex={[0]} allowMultiple>
                {ClassIndex.map((classItem, index) => (
                  <AccordionItem key={index} border={"none"}>
                    <h2>
                      <AccordionButton
                        color={"white"}
                        h={"60px"}
                        _hover={{ bgColor: "gray.800" }}
                        _expanded={{ bg: "gray.800" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          {classItem.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} color={"white"}>
                      {classItem.classList.map((item, index) => (
                        <Flex
                          key={index}
                          w={"100%"}
                          _hover={{ bgColor: "gray.600" }}
                          p={3}
                          flexDirection={"column"}
                          gap={3}
                        >
                          <Heading size={"xs"}>{item.desc}</Heading>
                          <Text fontSize={"sm"}>{item.time}분</Text>
                        </Flex>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabContentBox>
          </TabPanel>
          <TabPanel>
            <Flex flexDirection={"column"} gap={3}>
              <TabContentBox
                display={"flex"}
                color={"white"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>공지_.pdf</Text>
                <DownloadIcon w={5} h={5} />
              </TabContentBox>
              <TabContentBox
                display={"flex"}
                color={"white"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>공지_.pdf</Text>
                <DownloadIcon w={5} h={5} />
              </TabContentBox>
            </Flex>
          </TabPanel>
          <TabPanel bg={"gray.700"} p={5} borderRadius={5}>
            <Flex
              color={"white"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>공지사항이 없습니다.</Text>
            </Flex>
          </TabPanel>
          <TabPanel bg={"gray.700"} p={5} borderRadius={5}>
            <Flex
              color={"white"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>나만의 노트를 작성해보셔요.</Text>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default ClassRoomSideBar;
