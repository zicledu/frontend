import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast // useToast 추가
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  EditIcon,
  LinkIcon,
  RepeatClockIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API } from "../../../../config"; 

interface ClassSummaryProps {
  courseId: string;
}

const IconDesc = ({ icon, desc }: { icon: JSX.Element; desc: string }) => (
  <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
    <Box p={3} bg={"gray"} borderRadius={15} display={"inline-block"}>
      {icon}
    </Box>
    <Text mt={3} fontSize="xs" fontWeight={"bold"}>
      {desc}
    </Text>
  </Box>
);

const ClassDetailInfo = ({ icon, desc }: { icon: JSX.Element; desc: string }) => (
  <Flex alignItems={"center"} gap={2}>
    {icon}
    <Text color={"white"} fontSize={"sm"}>
      {desc}
    </Text>
  </Flex>
);

function ClassSummary({ courseId }: ClassSummaryProps) {
  const [summary, setSummary] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null); // 취소 버튼에 대한 참조
  const toast = useToast(); // useToast 훅 사용

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API.CLASS_SUMMARY.replace("courseId", courseId ?? ""));
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching course summary:", error);
      }
    };

    fetchData();
  }, [courseId]);

  const handleEnrollment = async () => {
    onOpen(); // 알람 열기
  };

  const handleConfirmEnrollment = async () => {
    try {
      // 여기에 classId와 userId를 바디에 담아서 요청을 보내는 로직 작성
      const response = await axios.post(API.CLASS_ENROLLMENT, {
        courseId: parseInt(courseId),
        userId: localStorage.getItem("userId"), // 적절한 userId로 대체
      });
      console.log("Enrollment successful:", response.data);
      onClose(); // 알람 닫기

      // 구매 성공 알림
      toast({
        title: "구매 성공",
        description: "강의를 성공적으로 구매하였습니다.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // 구매 처리 완료 후 추가 작업 수행
    } catch (error) {
      onClose(); // 알람 닫기
      console.error("Error enrolling in class:", error);

      // 실패 알림
      toast({
        title: "구매 실패",
        description: "이미 구매한 강의입니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      // 에러 처리
    }
  };

  return (
    <>
      {summary ? (
        <>
          <Flex justifyContent={"center"}>
            <Box as="picture">
              <Image src={summary.thumbnailPath} maxH={"500px"} />
            </Box>
          </Flex>
          <Flex justifyContent={"center"} p={10}>
            <Flex
              flexDirection={"column"}
              w={"340px"}
              gap={5}
              alignContent={"center"}
            >
              <Box textAlign={"center"}>
                <Heading color={"white"} size="md" px={3}>
                  {summary.title}
                </Heading>
                <Text fontSize="lg" color={"white"} p={2}>
                  {summary.instructorName}
                </Text>
              </Box>
              <Flex
                color={"white"}
                gap={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <IconDesc icon={<RepeatIcon />} desc={"평생시청"} />
                <IconDesc icon={<LinkIcon />} desc={"쿠폰할인"} />
                <IconDesc icon={<CheckCircleIcon />} desc={"수강가능"} />
              </Flex>
              <Flex color={"white"} justifyContent={"space-between"}>
                <Text>판매가</Text>
                <Text>{summary.price}</Text>
              </Flex>
              <Divider color={"gray"} />
              <Text color={"white"} fontSize={"sm"}>
                * 상품별 유의사항을 하단에서 반드시 확인해주세요.
              </Text>
              <Flex flexDirection={"column"} gap={4} pt={3}>
                <Heading color={"white"} size="md">
                  클래스 상세 정보
                </Heading>
                <ClassDetailInfo
                  icon={<RepeatClockIcon w={4} h={4} color={"gray"} />}
                  desc={"수강가능"}
                />
                <ClassDetailInfo
                  icon={<EditIcon w={4} h={4} color={"gray"} />}
                  desc={summary.time}
                />
                <ClassDetailInfo
                  icon={<RepeatClockIcon w={4} h={4} color={"gray"} />}
                  desc={"강의자료 포함"}
                />
              </Flex>
              <Flex gap={2}>
                <Tag colorScheme={"teal"}>{summary.tags}</Tag>
              </Flex>
              <Button colorScheme={"teal"} onClick={handleEnrollment}>구매하기</Button>
              <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />
                <AlertDialogContent
                  backgroundColor={"whitesmoke"}
                  >
                  <AlertDialogHeader>구매하시겠습니까?</AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    강의를 구매하시겠습니까?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                      취소
                    </Button>
                    <Button colorScheme='teal' ml={3} onClick={handleConfirmEnrollment}>
                      구매
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Flex>
          </Flex>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ClassSummary;
