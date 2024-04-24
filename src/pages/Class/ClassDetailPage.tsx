import React, { useState, useEffect } from "react";
import ClassSummary from "./sections/ClassSummary.tsx";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
} from "@chakra-ui/react";
import ClassInfo from "./sections/ClassInfo.tsx";
import SpeakerInfo from "./sections/SpeakerInfo.tsx";
import Curriculum from "./sections/Curriculum.tsx";
import ContentArea from "../../components/ContentArea";
import ContentBox from "../../components/ContentBox/index.tsx";

function ClassDetailPage() {
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(true); // courseId 로딩 상태 추가

  useEffect(() => {
    const url = window.location.href;
    const courseIdIndex = url.lastIndexOf("/");
    const courseIdValue = url.substring(courseIdIndex + 1);
    setCourseId(courseIdValue);
    setLoading(false); // courseId 설정 후 로딩 상태 변경
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  return (
    <>
      <ContentArea className={"class-detail"} bgColor={"black"}>
        {!loading && <ClassSummary courseId={courseId} />} {/* courseId 로딩 상태 확인 후 렌더링 */}
      </ContentArea>
      <Tabs isFitted>
        <TabList bg={"#242424FF"}>
          <ContentBox display={"flex"}>
            <Tab color={"white"}>클래스 소개</Tab>
            <Tab color={"white"}>연사 소개</Tab>
            <Tab color={"white"}>커리큘럼</Tab>
          </ContentBox>
        </TabList>

        <TabPanels>
          <ContentArea className={"class-detail"} bgColor={"white"}>
            <TabPanel p={0}>
              {!loading && <ClassInfo courseId={courseId} />} {/* courseId 로딩 상태 확인 후 렌더링 */}
            </TabPanel>
          </ContentArea>
          <ContentArea className={"class-detail"} bgColor={"gray.50"}>
            <TabPanel p={0}>
              {!loading && <SpeakerInfo courseId={courseId} />} {/* courseId 로딩 상태 확인 후 렌더링 */}
            </TabPanel>
          </ContentArea>
          <ContentArea className={"class-detail"} bgColor={"gray.50"}>
            <TabPanel p={0}>
              {!loading && <Curriculum courseId={courseId} />} {/* courseId 로딩 상태 확인 후 렌더링 */}
            </TabPanel>
          </ContentArea>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default ClassDetailPage;
