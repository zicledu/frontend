import React, { useRef, useState } from 'react';
import TuiEditor from '../../components/Editor/TuiEditor';
import axios from 'axios';
import { Input, CloseButton, Container, Stack, Box, Button, Flex, InputLeftAddon, InputGroup, Image, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import ImageInput from './ImageInput';
import { AddIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { API } from '../../../config';

type UploadPageProps = {
  editorRef: React.RefObject<any> | null;
};

type Lecture = {
  title: string;
  file: File | null;
  order: number;
};

const UploadPage: React.FC<UploadPageProps> = ({ editorRef }) => {

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isTitleInvalid, setIsTitleInvalid] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState<number>(0);

  const toast = useToast()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleInvalid(false); // 제목이 변경되면 유효하지 않음 상태를 초기화
  };

  const handlePriceChange = (value: number) => {
    setPrice(value);
  }
  
  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleAddLecture = () => {
    const newOrder = lectures.length + 1
    setLectures(prevLectures => [...prevLectures, { title: '', file: null, order:newOrder }]);
  };

  const handleLectureTitleChange = (index: number, value: string) => {
    setLectures(prevLectures =>
      prevLectures.map((lecture, i) => (i === index ? { ...lecture, title: value } : lecture))
    );
  };

  const handleLectureOrderChange = (index: number, value: string) => {
    setLectures(prevLectures =>
      prevLectures.map((lecture, i) => (i === index ? { ...lecture, order: parseInt(value) } : lecture))
    );
  };

  const handleLectureFileChange = (index: number, file: File | null) => {
    setLectures(prevLectures =>
      prevLectures.map((lecture, i) => (i === index ? { ...lecture, file: file ?? null } : lecture))
    );
  };

  const handleRemoveLecture = (index: number) => {
    setLectures(prevLectures => prevLectures.filter((_, i) => i !== index));
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  const imageHandler = (blob: File, callback: (url: string) => void) => {
    const formData = new FormData();
    formData.append('file', blob);

    axios
      .post(API.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem("idToken")
        }
      })
      .then(response => {
        const imageUrl = response.data.imageUrl;
        callback(imageUrl);
      })
      .catch(error => {
        console.error('이미지 업로드 실패: ', error);
      });
  };

  const handleSubmit = async () => {
    if (!title) {
      // 제목 입력란이 비어 있는 경우
      if (titleInputRef.current) {
        // 해당 입력란으로 포커스 이동
        titleInputRef.current.focus();
      }
      setIsTitleInvalid(true); // 입력란이 비어 있으면 유효하지 않음으로 표시
      return; // 입력 내용이 없으므로 제출하지 않음
    }

    if (!editorRef || !editorRef.current) {
      console.error("Editor reference is not available.");
      return;
    }

    const loadingToast = toast({
      title: '제출 중...',
      status: 'info',
      duration: null,
      isClosable: false,
    });
  
    const markdown = editorRef.current.getInstance().getMarkdown();

    console.log(selectedDate)

    
    const formData = new FormData();
    formData.append('title', title)
    if (selectedImage) {
      formData.append('thumbnail', selectedImage)
    }
  
    formData.append('markdown', markdown);
    formData.append('selectedDate', selectedDate)
    formData.append('price', price.toString());
     
    console.log(lectures)
    lectures.forEach((lecture, index) => {
      formData.append(`lecture[${index}][title]`, lecture.title);
      if (lecture.file) {
        formData.append(`lecture[${index}][file]`, lecture.file);
      }
      formData.append(`lecture[${index}][order]`, lecture.order.toString());
    });

  try {

    console.log(formData.values);
    const response = await axios.post(API.UPLOAD_COURSE, formData, 
      {
        headers:{'Authorization': "Bearer "+localStorage.getItem("idToken")
      }});
      
      toast.update(loadingToast, {
        title: '제출 완료',
        description: '서버에 성공적으로 제출되었습니다.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      console.log(response)
      const courseId = response.data.courseId
      

      navigate(`/class/${courseId}`)


      
  } catch (error) {
    console.error('Submission error:', error);

    toast.update(loadingToast, {
      title: '제출 실패',
      description: '제출 중에 오류가 발생했습니다.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
    


  };

  return (
    <Container maxW='1000px' marginTop={'10px'}>
      <Stack spacing={2} direction="row" marginBottom={1}>
        <ImageInput 
          defaultSrc="https://via.placeholder.com/500x250" 
          onImageChange={handleImageChange} />
        <Input
          ref={titleInputRef} // ref 추가
          placeholder='제목을 입력하세요'
          isInvalid={isTitleInvalid}
          errorBorderColor='crimson'
          size='lg'
          value={title}
          onChange={handleTitleChange}
          height='150px'
        />
      </Stack>
      <InputGroup mb={1}>
        <InputLeftAddon>강의 오픈 일정</InputLeftAddon>
        <Input 
          placeholder='오픈 예정 날짜를 선택해주세요' 
          size='md' 
          type='datetime-local' 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          />
      </InputGroup>

      <InputGroup>
          <NumberInput 
          value={price}
          onChange={(_, valueNumber) => handlePriceChange(valueNumber)}
          
          >
            <NumberInputField 
              placeholder='0000'  
              />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
      </InputGroup>
      
      <Stack>
        
        <TuiEditor
          content={''}
          editorRef={editorRef}
          imageHandler={imageHandler}
        />

        {lectures.map((lecture, index) => (
          <Box key={index} marginTop={1} borderWidth={2} padding={2} textAlign="center">
            <InputGroup>
              <InputLeftAddon>제목</InputLeftAddon>
              <Input
                type="text"
                placeholder={`강의 제목 ${index + 1}`}
                value={lecture.title}
                onChange={(e) => handleLectureTitleChange(index, e.target.value)}
              />
              <Flex alignItems={"center"} marginLeft={1} onClick={() => handleRemoveLecture(index)} cursor="pointer">
                <CloseButton boxSize={10}/>
              </Flex>
            </InputGroup>
            

            <InputGroup marginTop={1}>
              <InputLeftAddon>순서</InputLeftAddon>
              <NumberInput 
                defaultValue={lectures.length} 
                min={1} 
                value={lecture.order}
                onChange={(e) => handleLectureOrderChange(index, e)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>

            <label htmlFor={`fileInput-${index}`}>
              {lecture.file ? (
                <span
                  style={{ marginTop: '1px', cursor: 'pointer', display: 'block', width: '250px', height: '50px', lineHeight: '50px' }}
                >
                  {lecture.file.name}
                </span>
              ) : (
                <Flex justifyContent={"center"}>
                  <Image
                    marginTop={1}
                    src="https://placehold.co/250x50?text=Click+here+to+upload+video"
                    alt="Upload Video"
                    cursor="pointer"
                    objectFit="contain"
                    width="250px"
                    height="50px"
                  />
                </Flex>
              )}
            </label>
          
            <input
              id={`fileInput-${index}`}
              type="file"
              accept="video/*"
              onChange={(e) => handleLectureFileChange(index, e.target.files ? e.target.files[0] : null)}
              multiple={false}
              style={{ display: 'none' }}
            />

          </Box>
        ))}

        <Flex justifyContent="flex-end">
          <Button rightIcon={<AddIcon />} colorScheme='facebook' variant='outline' onClick={handleAddLecture}>
            강의 추가
          </Button>
        </Flex>

        <Flex justifyContent="space-between" mb={2}>
          <Button mr={1} flex="1" colorScheme="yellow" variant="outline" onClick={handleGoBack}>
            뒤로가기
          </Button>
          <Button ml={1} flex="1" colorScheme="twitter" variant="outline" onClick={handleSubmit}>
            제출
          </Button>
        </Flex>

      </Stack>
    </Container>
  );
};

export default UploadPage;
