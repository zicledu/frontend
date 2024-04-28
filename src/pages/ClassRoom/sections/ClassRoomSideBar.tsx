import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../../config";
import ClassRoomVideo from "./ClassRoomVideo";

const ClassIndex = [
  {
    title: "강의 코스 목차 ",
    classList: [
      { desc: "Lecture 1-1", time: 3 },
      { desc: "Lecture 1-2", time: 3 },
      { desc: "Lecture 1-3", time: 3 },
    ],
  }
];

interface TabContentBoxProps extends BoxProps {
  children: React.ReactNode;
}

const TabContentBox = ({ children, ...props }: TabContentBoxProps) => (
  <Box bg={"gray.700"} p={5} borderRadius={5} {...props}>
    {children}
  </Box>
);

function ClassRoomSideBar(props: { userId: any; courseId: any; }) {
  const { userId, courseId } = props;
  const navigate = useNavigate();
  const [lectureList, setLectureList] = useState<CourseInfo[]>([]);
  const [selectedVideoPath, setSelectedVideoPath] = useState<string>(""); // 선택된 비디오 경로 상태
  const [selectedLectureTitle, setSelectedLectureTitle] = useState<string>(""); // 선택된 강의의 제목 상태

  type CourseInfo = {
    title: string;
    description: string;
    classId: number;
    thumbnailPath: string;
    courseId: number;
    lectureOrder: number;
    durationMinutes: string;
    videoPath720: string;
    videoPath1080: string;
    videoPathOriginal: string;
  };
  
  useEffect(() => {
    handleCourse();
  }, []); // 페이지가 로드될 때 한 번만 실행

  // 서버에서 최고의 결과를 가져오는 함수
  const handleCourse = () => {
    axios.get(
      API.MY_COURSE_LIST.replace('userId', userId).replace('courseId', courseId),
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("idToken")
        }
      }
    )
      .then((response) => {
        console.log("Course data received:", response.data.data);
        setLectureList(response.data.data); 
      })
      .catch((error) => {
        console.error('Error fetching lecture results', error);
      });
  };

  // 강의 항목을 클릭할 때 실행되는 함수
  const handleLectureClick = (lecture: CourseInfo) => {
    setSelectedVideoPath(lecture.videoPathOriginal); // 선택된 강의의 비디오 경로를 설정합니다.
    setSelectedLectureTitle(lecture.title); // 선택된 강의의 제목을 설정합니다.
  };

  return (
    <>
      <Tabs size="md" h={"100%"} p={3}>
        <TabList>
          <Tab color={"teal.300"}>강의목차</Tab>
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
                      {lectureList.map((lecture, index) => ( // lectureList에서 강의 정보를 가져와서 반복문으로 출력합니다.
                        <Flex
                          key={index}
                          w={"100%"}
                          _hover={{ bgColor: "gray.600" }}
                          p={3}
                          flexDirection={"column"}
                          gap={3}
                          onClick={() => handleLectureClick(lecture)} // 강의 항목을 클릭할 때 해당 강의 정보를 전달합니다.
                          style={{ cursor: "pointer" }} // 마우스 커서 스타일을 변경하여 클릭 가능하다는 표시를 합니다.
                        >
                          <Heading size={"xs"}>{lecture.title}</Heading> {/* 강의 제목 출력 */}
                          <Text fontSize={"sm"}>{lecture.durationMinutes}분</Text> {/* 강의 시간 출력 */}
                        </Flex>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabContentBox>
          </TabPanel>
          
        </TabPanels>
      </Tabs>
      {/* ClassRoomVideo 컴포넌트에 선택된 강의의 비디오 경로와 제목을 전달합니다. */}
      {selectedVideoPath && <ClassRoomVideo userId={userId} courseId={courseId} videoPath={selectedVideoPath} lectureTitle={selectedLectureTitle} />}
    </>
  );
}

export default ClassRoomSideBar;
