// UnAuthorizedPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
    Text,
    Flex,
  } from "@chakra-ui/react";

const UnAuthorizedPage = () => {
    return (
        <div>
        <h1>401 - 권한 없음</h1>
        <p>이 요청은 권한이 없습니다.</p>
        <Link to={"/"}>
                <Flex alignItems={"end"}>
                  <Text>홈</Text>
                </Flex>
              </Link>
      </div>
    );
  };

export default UnAuthorizedPage;
