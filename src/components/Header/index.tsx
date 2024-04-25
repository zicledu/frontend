import { Link, useNavigate } from "react-router-dom";
import { Flex, Box, Text, Hide, Show, Image } from "@chakra-ui/react";
import axios from "axios";
import React, {useState, useEffect} from "react";
import CustomDrawer from "../CustomDrawer";
import logoImage from "/images/ZICLEDU-logo.png";
import ContentBox from "../ContentBox";
import { API } from "../../../config"

const HeaderLink = ({ text, path, onClick }: { text: string; path: string; onClick?: () => void }) => (
  <Text color={"white"} fontWeight={"bold"}>
    {onClick ? (
      <a href="" onClick={onClick}>{text}</a>
    ) : (
      <Link to={path} onClick={() => window.location.pathname === path && window.location.reload()}>{text}</Link>
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

  // 로그아웃 함수
  const handleLogout = async () => {
    console.log(API.LOGOUT);
    // 입력된 데이터를 서버로 전송합니다.
    const response = await axios.post(
      API.LOGOUT, 
      {},
      {
        headers: {
          Authorization: "Bearer "+localStorage.getItem("accessToken")
        }
      }
    );
    console.log(response.data); // 서버 응답 로그 출력
    console.log(response.status); // 서버 응답 로그 출력
    if (response.status == 200) {
      // 로그아웃 로직을 수행
      // 예: 서버로 로그아웃 요청을 보내고, 성공적으로 처리되면 상태를 업데이트
      localStorage.removeItem("isLoggedIn"); // 로컬 스토리지에서 로그인 상태 제거
      setIsLoggedIn(false);
      // 이후 필요한 처리 수행 (예: 페이지 리디렉션 등)

      localStorage.removeItem("idToken")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("userName")
      localStorage.removeItem("email")
      localStorage.removeItem("expiredDate") 
      window.alert("로그아웃 되었습니다.")
    }
  }



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
                <HeaderLink text={"로그아웃"} onClick={handleLogout} path={"/logout"} />
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
