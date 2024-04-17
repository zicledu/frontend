import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Text,
  Avatar,
  Flex,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function CustomDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true'; // 로그인 여부 확인

  const handleLogout = () => {
    // 로그아웃 로직 구현
    localStorage.removeItem("isLoggedIn");
    // 다른 필요한 로그아웃 처리 구현
  };

  return (
    <>
      <Text color={"white"} fontWeight={"bold"}>
        <HamburgerIcon onClick={onOpen} />
      </Text>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isLoggedIn ? (
              <Flex alignItems={"center"}>
                <Avatar src="https://bit.ly/broken-link" size="xs" mr={3} />
                <Text>{localStorage.getItem("userName")}</Text>
              </Flex>
            ) : (
              <Link to={"/login"}>
                <Flex alignItems={"center"}>
                  <Avatar src="https://bit.ly/broken-link" size="xs" mr={3} />
                  <Text>로그인</Text>
                </Flex>
              </Link>
            )}
          </DrawerHeader>

          <DrawerBody>
            <Box p={3}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                <Link to={"/event"}>이벤트</Link>
              </Text>
            </Box>
            <Box p={3}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                <Link to={`/${localStorage.getItem("userId")}/classroom`}>나의 강의장</Link>
              </Text>
            </Box>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            {isLoggedIn ? (
              <Flex alignItems={"end"}>
                
              </Flex>
            ) : (
              <Link to={"/signup"}>
                <Flex alignItems={"end"}>
                  <Text>회원가입</Text>
                </Flex>
              </Link>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CustomDrawer;
