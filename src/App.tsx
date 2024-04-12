import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import React from "react";
import ClassDetailPage from "./pages/Class/ClassDetailPage.tsx";
import MyClassroom from "./pages/account/MyClassroom.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import AccountLayout from "./layouts/AccountLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import ScrollToTop from "./utils/ScrollToTop";
import BestClassPage from "./pages/bestClass/BestClassPage.tsx";
import NewClassPage from "./pages/newClass/NewClassPage.tsx";
import EventPage from "./pages/event/EventPage.tsx";
import WelcomeBenefit from "./pages/event/WelcomeBenefit.tsx";
import { LoginPage } from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignupPage";
import ClassRoomPage from "./pages/ClassRoom/ClassRoomPage";
import MainPage from "./pages/Main/MainPage";

function App() {
  return (
    <Box w={"100%"} h={"100%"}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path={"/class/:id"} element={<ClassDetailPage />} />
          <Route path={"/best"} element={<BestClassPage />} />
          <Route path={"/new-classes"} element={<NewClassPage />} />
          <Route path={"/event"} element={<EventPage />} />
          <Route path={"/welcomebenefit"} element={<WelcomeBenefit />} />
        </Route>
        <Route path="/account" element={<AccountLayout />}>
          <Route path="/account/classroom" element={<MyClassroom />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="/classroom">
          <Route path={"/classroom/1"} element={<ClassRoomPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
