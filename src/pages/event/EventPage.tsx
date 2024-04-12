import React from "react";
import ContentArea from "../../components/ContentArea";
import { Heading } from "@chakra-ui/react";

function EventPage() {
  return (
    <ContentArea minHeight={"calc(100vh - 2.5em)"}>
      <Heading p={5} color={"white"}>
        이벤트
      </Heading>
    </ContentArea>
  );
}

export default EventPage;
