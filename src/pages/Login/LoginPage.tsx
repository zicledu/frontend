import React, {useState} from "react";
import axios from 'axios';
import {
  FormControl,
  VStack,
  Input,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {API} from "../../../config"
export const LoginPage = () => {

  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 입력 필드의 이름과 값을 상태에 반영합니다.
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSignUp = async () => {
    try {

      // 입력된 데이터를 서버로 전송합니다.
      const response = await axios.post(API.LOGIN, formData);
      
      localStorage.setItem("refreshToken", response.data.tokenDto.refreshToken)
      localStorage.setItem("accessToken", response.data.tokenDto.accessToken)
      localStorage.setItem("idToken", response.data.tokenDto.idToken)

      localStorage.setItem("isLoggedIn", 'true')

      localStorage.setItem("userId", response.data.userId)
      localStorage.setItem("userName", response.data.userName)
      localStorage.setItem("email", response.data.email)
      localStorage.setItem("expiredDate", response.data.expiredDate)
      localStorage.setItem("role", response.data.role)
      
      navigate(`${API.HOME}`);
    } catch (error) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: ""
      }));
      console.log(error)
      window.alert("잘못된 아이디 또는 비밀번호 입니다.")
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignUp(); // 엔터 키를 눌렀을 때 로그인 함수 호출
    }
  };


  return (
    <VStack spacing={5} w={"340px"}>
      <Heading as="h3">로그인</Heading>
      <FormControl>
        <Input variant="outline" placeholder="이메일" name="email" value={formData.email} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="비밀번호" type="password" name="password" value={formData.password} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
      </FormControl>
      <Button colorScheme="teal" w={"100%"} onClick={handleSignUp}>
        로그인
      </Button>
      <Link to={"/signup"}>
        <Text fontSize="sm">회원가입 하러가기</Text>
      </Link>
    </VStack>
  );
};
