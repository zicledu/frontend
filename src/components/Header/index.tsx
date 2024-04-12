import { Link, useNavigate } from "react-router-dom";
import { Flex, Box, Text, Hide, Show, Image } from "@chakra-ui/react";
import React from "react";
import CustomDrawer from "../CustomDrawer";
import logoImage from "/images/monstera-logo.png";
import ContentBox from "../ContentBox";

const HeaderLink = ({ text, path }: { text: string; path: string }) => (
  <Text color={"white"} fontWeight={"bold"}>
    <Link to={path}>{text}</Link>
  </Text>
);

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      w={"100%"}
      bg="black"
      position={"fixed"}
      zIndex={100}
      display={"block"}
      top={0}
      left={0}
    >
      <ContentBox>
        <Flex
          as={"header"}
          h={"56px"}
          alignItems={"center"}
          align={"center"}
          justify={"space-between"}
          className={"header"}
          maxW="6xl"
          px={3}
        >
          <Box onClick={() => navigate("/")}>
            <Image w={"150px"} h={"24px"} src={logoImage} cursor={"pointer"} />
          </Box>

          <Flex justifyContent={"flex-end"} gap={5}>
            <Show above="lg">
              <HeaderLink text={"나의 강의장"} path={"/account/classroom"} />
              <HeaderLink text={"로그인"} path={"/login"} />
            </Show>
            <Hide above="lg">
              <CustomDrawer />
            </Hide>
          </Flex>
        </Flex>
        <Flex
          gap={5}
          as={"header"}
          h={"56px"}
          alignItems={"center"}
          className={"header"}
          maxW="6xl"
          overflowX={"auto"}
          px={3}
        >
          <Box flexShrink={0}>
            <HeaderLink text={"HOME"} path={"/"} />
          </Box>
          <Box flexShrink={0}>
            <HeaderLink text={"BEST"} path={"/best"} />
          </Box>
          <Box flexShrink={0}>
            <HeaderLink text={"신규 클래스"} path={"/new-classes"} />
          </Box>
          <Box flexShrink={0}>
            <HeaderLink text={"이벤트"} path={"/event"} />
          </Box>
          <Box flexShrink={0}>
            <HeaderLink text={"웰컴기프트"} path={"/welcomebenefit"} />
          </Box>
        </Flex>
      </ContentBox>
    </Box>
  );
};

export default Header;
