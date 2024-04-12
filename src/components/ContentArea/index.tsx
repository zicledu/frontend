import React, { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import ContentBox from "../ContentBox";

interface ContentAreaProps extends BoxProps {
  children: ReactNode;
}

function ContentArea({ children, ...rest }: ContentAreaProps) {
  return (
    <Box bg={"c.bgColor"} {...rest} className={"content-area"}>
      <ContentBox>{children}</ContentBox>
    </Box>
  );
}

export default ContentArea;
