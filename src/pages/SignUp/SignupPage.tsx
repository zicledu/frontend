import React, { useState } from "react";
import axios from "axios";
import { Button, FormControl, Heading, Input, RadioGroup, VStack, Radio, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../config";

function SignUpPage() {
  const navigate = useNavigate();
  const toast = useToast();

  // 입력된 데이터를 상태로 관리합니다.
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    telephone: "",
    password: "",
    role: "student"
  });

  // 입력 필드 값이 변경될 때마다 호출되는 함수입니다.
  const handlInputChange = (e: any) => {
    const { name, value } = e.target;
    // 입력 필드의 이름과 값을 상태에 반영합니다.
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // 입력된 데이터를 검증하고 모든 필드가 채워져 있는지 확인하는 함수입니다.
  const validateFormData = () => {
    const { userName, email, telephone, password } = formData;
    if (!userName || !email || !telephone || !password) {
      return false; // 하나라도 비어있다면 false 반환
    }
    return true; // 모든 필드가 채워져 있다면 true 반환
  };

  // 경고 메시지를 표시하는 함수입니다.
  const showWarningMessage = () => {
    toast({
      title: "모든 필드를 작성해주세요.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  // 회원가입 버튼을 클릭했을 때 호출되는 함수입니다.
  const handleSignUp = async () => {
    // 입력된 데이터를 검증합니다.
    if (!validateFormData()) {
      showWarningMessage(); // 필드가 비어있다면 경고 메시지 표시 후 반환
      return;
    }

    try {
      // 입력된 데이터를 서버로 전송합니다.
      const response = await axios.post(API.SIGNUP, formData);
      console.log(response.data); // 서버 응답 로그 출력

      // 회원가입 완료 메시지를 토스트로 표시합니다.
      toast({
        title: '회원가입 완료',
        description: "이메일로 회원 가입 확인 후 로그인 해주세요.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error('There was an error!', error); // 오류 발생
    }
  };

  // 엔터 키 입력 시 회원가입 동작을 실행하는 함수입니다.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 동작 방지
      handleSignUp(); // 엔터 키가 입력되면 회원가입 함수 실행
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
        <Input variant="outline" placeholder="이름" name="userName" value={formData.userName} onChange={handlInputChange} onKeyDown={handleKeyDown} />
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="이메일" name="email" value={formData.email} onChange={handlInputChange} onKeyDown={handleKeyDown} />
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="휴대전화" name="telephone" value={formData.telephone} onChange={handlInputChange} onKeyDown={handleKeyDown} />
      </FormControl>
      <FormControl>
        <Input variant="outline" placeholder="비밀번호" type="password" name="password" value={formData.password} onChange={handlInputChange} onKeyDown={handleKeyDown} />
      </FormControl>
      <Button colorScheme="teal" w={"100%"} onClick={handleSignUp}>
        회원가입
      </Button>
    </VStack>
  );
}

export default SignUpPage;
