import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import logoImage from "/images/monstera-logo.png";
import { useNavigate } from "react-router-dom";
import ContentBox from "../ContentBox";
function Footer() {
  const navigate = useNavigate();

  return (
    <Box bg="black" as={"footer"}>
      <ContentBox py={4}>
        <Grid p={4} templateColumns="repeat(3)" gap={4}>
          <GridItem colSpan={3} pb={4}>
            <Box onClick={() => navigate("/")}>
              <Image
                w={"150px"}
                h={"24px"}
                src={logoImage}
                cursor={"pointer"}
              />
            </Box>
          </GridItem>
          <GridItem>
            <Flex flexDirection={"column"} gap={4}>
              <Text color={"white"} fontWeight={"bold"} fontSize="lg">
                COMPANY
              </Text>
              <Text color={"white"}>공지사항</Text>
              <Text color={"white"}>채용안내</Text>
              <Text color={"white"}>FAQ</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection={"column"} gap={4}>
              <Text color={"white"} fontWeight={"bold"} fontSize="lg">
                SERVICE
              </Text>
              <Text color={"white"}>이용약관</Text>
              <Text color={"white"} fontWeight={"bold"}>
                개인정보처리방침
              </Text>
              <Text color={"white"}>환불규정</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection={"column"} gap={4}>
              <Text color={"white"} fontWeight={"bold"} fontSize="lg">
                고객센터
              </Text>
              <Button>문의하기</Button>
            </Flex>
          </GridItem>
        </Grid>
      </ContentBox>
    </Box>
  );
}

export default Footer;
