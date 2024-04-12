import React from "react";
import ContentArea from "../../components/ContentArea";
import { Heading } from "@chakra-ui/react";

function WelcomeBenefit() {
  return (
    <ContentArea minHeight={"calc(100vh - 2.5em)"}>
      <Heading p={5} color={"white"}>
        웰컴 키프트
      </Heading>
    </ContentArea>
  );
}

export default WelcomeBenefit;
