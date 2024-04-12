import React from "react";
import { Heading } from "@chakra-ui/react";

interface SectionTitleProps {
  title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Heading color={"white"} py={4} as="h4" size="md">
      {title}
    </Heading>
  );
}

export default SectionTitle;
