import React, { KeyboardEvent, useState } from "react";
import axios from "axios";
import { Button, FormControl, Heading, Input, RadioGroup, VStack, Radio, Flex, Spacer, Toast } from "@chakra-ui/react";
import {useNavigate } from "react-router-dom";
import { API } from "../../../config"

function SignUpPage() {

  const navigate = useNavigate();

  // 입력 데이터를 상태로 관리합니다.
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    telephone: "",
    password: "",
    role: "student"
  });

  // 입력 필드 값이 변경될 때마다 호출되는 함수입니다.
  const handlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 입력 필드의 이름과 값을 상태에 반영합니다.
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // 회원가입 버튼을 클릭했을 때 호출되는 함수입니다.
  const handleSignUp = async () => {
    try {
      // 입력된 데이터를 서버로 전송합니다.
      const response = await axios.post(API.SIGNUP, formData);
      console.log(response.data); // 서버 응답 로그 출력

      alert("이메일에서 회원 가입 확인 후 로그인 해주세요")

      navigate("/login");
    } catch (error) {
      console.error('There was an error!', error); // 오류 발생
    }
  };

  return (
    <VStack spacing={5} w={"340px"}>
      <Heading as="h3">회원가입</Heading>
      <FormControl>
        <RadioGroup defaultValue="student" name="role" value={formData.role} onChange={(value) => setFormData((prevFormData) => ({ ...prevFormData, role: value }))}>
          <Flex >
            <Radio value="student">학생</Radio>
            <Spacer />
            <Radio value="instructor">강사</Radio>
            <Spacer />
            <Radio value="admin">관리자</Radio>
          </Flex>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="이름" name="userName" value={formData.userName} onChange={handlInputChange} />
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="이메일" name="email" value={formData.email} onChange={handlInputChange} />
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="휴대전화" name="telephone" value={formData.telephone} onChange={handlInputChange} />
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="비밀번호" type="password" name="password" value={formData.password} onChange={handlInputChange} />
      </FormControl>
      <Button colorScheme="teal" w={"100%"} onClick={handleSignUp}>
        회원가입
      </Button>
    </VStack>
  );
}

export default SignUpPage;
