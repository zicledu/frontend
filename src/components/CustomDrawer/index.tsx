import React from "react";
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
            <Link to={"/login"}>
              <Flex alignItems={"center"}>
                <Avatar src="https://bit.ly/broken-link" size="xs" mr={3} />
                <Text>로그인</Text>
              </Flex>
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <Box p={3}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                <Link to={"/event"}>이벤트</Link>
              </Text>
            </Box>
            <Box p={3}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                <Link to={"/account/classroom"}>나의 강의장</Link>
              </Text>
            </Box>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Text onClick={onClose}>로그아웃</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CustomDrawer;
