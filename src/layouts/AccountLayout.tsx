import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Show,
  Container,
  useBreakpoint,
} from "@chakra-ui/react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentArea from "../components/ContentArea";

const AccountLayout = (): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentBreakPoint = useBreakpoint();

  const AccountHeader = () => (
    <Flex flexDirection={"column"}>
      <Box as={"header"} w={{ lg: "350px" }} position={"relative"}>
        <Heading size="lg" color={"white"} px={8} pt={10} pb={10}>
          <Text>안녕하세요</Text>
          <Text pt={1}>XXX님!</Text>
        </Heading>
      </Box>
      <AccountMenu />
    </Flex>
  );

  const AccountMenu = () => {
    const MenuButton = ({ text, path }: { text: string; path: string }) => (
      <Button
        onClick={() => navigate(path)}
        fontSize={"sm"}
        height={"100%"}
        flex={"1 1"}
        borderRadius={{ lg: 10 }}
        _first={{
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        _last={{
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
        bgColor={location.pathname === path ? "teal.50" : "white"}
        p={4}
      >
        <Text as="span" color="teal" fontWeight={"bold"}>
          <Link to={path}>{text}</Link>
        </Text>
      </Button>
    );

    return (
      <Box px={8} bgColor={"transparent"}>
        <Flex
          flexDirection={{ base: "row", lg: "column" }}
          justifyContent={{ base: "space-around", lg: "none" }}
          gap={{ lg: 3 }}
          p={3}
        >
          <MenuButton text={"나의 강의장"} path={"/account/classroom"} />
          <MenuButton text={"쿠폰"} path={"#"} />
          <MenuButton text={"거래내역"} path={"#"} />
          <Show above={"lg"}>
            <Box>
              <Button
                bg={"transparent"}
                color={"white"}
                fontSize={"sm"}
                w={"100%"}
                _hover={{ bgColor: "transparent" }}
              >
                로그아웃
              </Button>
            </Box>
          </Show>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      <Header />
      <Box as={"main"} pt={"112px"} h={"100%"}>
        <ContentArea h={"100%"}>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            alignContent={{ lg: "center" }}
            justifyContent={{ lg: "center" }}
            w={"100%"}
            minHeight={"calc(100vh - 2.5em)"}
            alignItems={"stretch"}
          >
            <AccountHeader />
            <Box bgColor={"white"} flex={"1 1"} p={8}>
              <Box flex={1}>
                <Outlet />
              </Box>
            </Box>
          </Flex>
        </ContentArea>
      </Box>
      <Footer />
    </>
  );
};

export default AccountLayout;
