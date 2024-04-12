import React, { ReactNode } from "react";
import { Container, ContainerProps } from "@chakra-ui/react";
interface ContentBoxProps extends ContainerProps {
  children: ReactNode;
}
function ContentBox({ children, ...rest }: ContentBoxProps) {
  return (
    <Container maxW="6xl" p={0} {...rest}>
      {children}
    </Container>
  );
}

export default ContentBox;
