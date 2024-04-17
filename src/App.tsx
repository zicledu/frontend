import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jsonwebtoken";
import ScrollToTop from "./utils/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import AccountLayout from "./layouts/AccountLayout";
import AuthLayout from "./layouts/AuthLayout";
import ClassDetailPage from "./pages/Class/ClassDetailPage";
import MyClassroom from "./pages/account/MyClassroom";
import BestClassPage from "./pages/bestClass/BestClassPage";
import NewClassPage from "./pages/newClass/NewClassPage";
import EventPage from "./pages/event/EventPage";
import WelcomeBenefit from "./pages/event/WelcomeBenefit";
import { LoginPage } from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignupPage";
import ClassRoomPage from "./pages/ClassRoom/ClassRoomPage";
import MainPage from "./pages/Main/MainPage";
import SearchPage from "./pages/Search/SearchPage";
import { sendRequestWithRefresh } from './utils/authUtils';
import NotFoundPage from "./pages/error/NotFoundPage";
import UnAuthorizedPage from "./pages/error/UnAuthorizedPage"

function App() {
  
  sendRequestWithRefresh();

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
          <Route path={"/search"} element={<SearchPage />} />
        </Route>
        <Route path="/:userId" element={<AccountLayout />}>
          <Route path="/:userId/classroom" element={<MyClassroom />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="/classroom">
          <Route path="/classroom/:classId" element={<ClassRoomPage />} />
        </Route>
        {/* 인증되지 않은 경로로의 리디렉션 처리 */}
        <Route path="/error/401" element={<UnAuthorizedPage/>}/>
        <Route path="/error/404" element={<NotFoundPage/>}/>
        <Route path="*" element={<Navigate to="/error/404" replace />} />
        
      </Routes>
    </Box>
  );
}

export default App;
