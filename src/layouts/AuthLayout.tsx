import React, { ReactNode } from "react";
import { Center, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AuthLayout = (): ReactNode => (
  <>
    <Header />
    <Flex height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        <Outlet />
      </Center>
    </Flex>
    <Footer />
  </>
);
export default AuthLayout;
