import axios from "axios";
import { Navigate } from "react-router-dom";
import { API } from "../../config"

export const sendRequestWithRefresh = async () => {
  try {
    // 서버에 로그인 상태를 확인하고, 필요한 경우에만 refresh token을 사용하여 토큰을 재발급 받음
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const accessToken = localStorage.getItem("accessToken"); // 오타 수정
    const currentTime = Date.now();

    console.log(currentTime)

    const expiredDateStr = localStorage.getItem("expiredDate");
    const expiredDate = expiredDateStr ? new Date((expiredDateStr)).getTime() : null; // null 값 처리

    console.log("expiredDate = "+ expiredDate)

  
    if (isLoggedIn && expiredDate && expiredDate < currentTime) {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(API.REFRESH, 
      { refreshToken },
    );
      // 새로운 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", response.data.tokenDto.accessToken);
      localStorage.setItem("idToken", response.data.tokenDto.idToken);
      localStorage.setItem("expiredDate", response.data.expiredDate);
    }
    // 이후 요청을 보내거나 다른 처리를 진행
    // 예: sendRequest() 등
  } catch (error) {
    localStorage.removeItem("isLoggedIn"); // 로컬 스토리지에서 로그인 상태 제거
    // 이후 필요한 처리 수행 (예: 페이지 리디렉션 등)

    localStorage.removeItem("idToken")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("email")
    localStorage.removeItem("expiredDate")
    console.error("토큰 갱신 중 오류 발생:", error);
    return <Navigate to="/login" replace />;
  }
};
