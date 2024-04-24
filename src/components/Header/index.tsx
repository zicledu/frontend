import { Link, useNavigate } from "react-router-dom";
import { Flex, Box, Text, Hide, Show, Image } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CustomDrawer from "../CustomDrawer";
import logoImage from "/images/monstera-logo.png";
import ContentBox from "../ContentBox";
import { API } from "../../../config";

const HeaderLink = ({ text, path, onClick }: { text: string; path?: string; onClick?: () => void }) => (
  <Text color={"white"} fontWeight={"bold"}>
    {path ? (
      <Link to={path}>{text}</Link>
    ) : (
      <span onClick={onClick} style={{ cursor: "pointer" }}>{text}</span>
    )}
  </Text>
);


const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    // 로그아웃 처리
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("expiredDate");
    localStorage.removeItem("role");
    window.alert("로그아웃 되었습니다.");
  };

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
              <HeaderLink text={"나의 강의장"} path={`/${localStorage.getItem("userId")}/classroom`} />
              {isLoggedIn ? (
                <>
                  {localStorage.getItem('role') === 'instructor' && <HeaderLink text={"강의 등록"} path={"/upload"} />}
                  <HeaderLink text={"로그아웃"} onClick={handleLogout} />
                </>
              ) : (
                <HeaderLink text={"로그인"} path={"/login"} />
              )}
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
            <HeaderLink text={"강의"} path={"/search"} onClick={() => navigate("/search")} />
          </Box>
        </Flex>
      </ContentBox>
    </Box>
  );
};

export default Header;
