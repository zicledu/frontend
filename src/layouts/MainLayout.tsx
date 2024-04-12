import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = (): ReactNode => (
  <>
    <Header />
    <Box as={"main"} pt={"112px"}>
      <Outlet />
    </Box>
    <Footer />
  </>
);
export default MainLayout;
