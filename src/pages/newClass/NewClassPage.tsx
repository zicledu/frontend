import React from "react";
import ContentArea from "../../components/ContentArea";
import { Heading } from "@chakra-ui/react";

function NewClassPage() {
  return (
    <ContentArea minHeight={"calc(100vh - 2.5em)"}>
      <Heading p={5} color={"white"}>
        신규 클래스
      </Heading>
    </ContentArea>
  );
}

export default NewClassPage;
