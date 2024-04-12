import React from "react";
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
  return (
    <>
      <ContentArea className={"class-detail"} bgColor={"black"}>
        <ClassSummary />
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
          <ContentArea className={"class-detail"} bgColor={"gray.900"}>
            <TabPanel p={0}>
              <ClassInfo />
            </TabPanel>
          </ContentArea>
          <ContentArea className={"class-detail"} bgColor={"gray.50"}>
            <TabPanel p={0}>
              <SpeakerInfo />
            </TabPanel>
          </ContentArea>
          <ContentArea className={"class-detail"} bgColor={"gray.50"}>
            <TabPanel p={0}>
              <Curriculum />
            </TabPanel>
          </ContentArea>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default ClassDetailPage;
