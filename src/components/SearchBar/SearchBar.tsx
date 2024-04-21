import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons"
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Container, Flex, SimpleGrid, Input, Button, IconButton, useColorModeValue, background } from "@chakra-ui/react";

interface SearchBarPropsType {
  placeholder: string;
  purpose: string;
}

function SearchBar(props: SearchBarPropsType) {
  const [searchKeyWord, setSearchKeyWord] = useState("");

  // useSearchParams는 URL에 쿼리 스트링을 입력해준다.
  const [searchParams, setSearchParams] = useSearchParams();
  
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.target.value);
  };

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 검색 키워드가 존재하는 경우에만 setState를 진행한다.
    if (!!searchKeyWord) {
      setSearchParams({
        keyword: searchKeyWord,
      });
    } else {
      // 검색 키워드가 존재하지 않는 경우, 쿼리 스트링이 없는 원래 URL을 보여주도록 navigate 처리한다.
      navigate(`${props.purpose === "search" ? "/search" : "/qa"}`);  // 이 부분 수정해야한다!!!!!!
    }
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <Box mx="auto" width="50%">
        <Flex align="center" justify="center">
          <input
            type="text"
            placeholder={props.placeholder}
            value={searchKeyWord}
            onChange={onChangeHandler}
            style={{ padding: "8px", fontSize: "16px", borderRadius: "999px", width: "100%", paddingLeft: "20px" }}
          />
          <Button 
            borderRadius="full"
            bgColor={useColorModeValue("gray.200", "gray.700")}
            _hover={{ bgColor: useColorModeValue("gray.300", "gray.600")}}
            ml={2}
          >
            <SearchIcon />
          </Button>
        </Flex>
      </Box>
    </form>
    
  );
}

export default SearchBar;