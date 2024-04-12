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
      const response = await axios.post("http://localhost:8080/login", formData);
      console.log(response.data); // 서버 응답 로그 출력
      
      localStorage.setItem("refreshToken", response.data.refreshToken)
      sessionStorage.setItem("accessToken", response.data.accessToken)
      sessionStorage.setItem("idToken", response.data.idToken)

      const payload = response.data.idToken.split('.')[1];
      const decodedPayload = JSON.parse(window.atob(payload));

      const userName = decodedPayload.email;

      console.log(userName);

      navigate("/");
    } catch (error) {
      console.error('There was an error!', error); // 오류 발생
    }
  };

  return (
    <VStack spacing={5} w={"340px"}>
      <Heading as="h3">로그인</Heading>
      <FormControl>
        <Input variant="outline" placeholder="이메일" name="email" value={formData.email} onChange={handleInputChange}/>
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="비밀번호" type="password" name="password" value={formData.password} onChange={handleInputChange}/>
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
