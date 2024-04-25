import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import ClassCard from '../../components/ClassCard';
import ContentArea from '../../components/ContentArea';
import { API } from '../../../config';
import SearchBar from '../../components/SearchBar/SearchBar'; // SearchBar 컴포넌트 import

// 검색 정보에 대한 타입 정의
type CourseSearchInfo = {
    title: string;
    description: string;
    courseId: number;
    thumbnailPath: string;
    tags: string;
    userName: string;
};

const ClassCardList = ({ children }: { children: ReactNode }) => (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} gridAutoRows={'1fr'} borderColor={'none'}>
        {children}
    </SimpleGrid>
);

function SearchPage() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<CourseSearchInfo[]>([]);
    const location = useLocation();

    useEffect(() => {
        // search 속성에 접근하면 쿼리 스트링 값을 얻을 수 있다.
        const keyWord = decodeURI(location.search);

        // 검색어가 존재하는 경우에 API 경로에 쿼리 스트링으로 전달하여 fetch한다.
        const fetchLectures = async () => {
            try {
                const getValue = keyWord ? API.COURSE_LIST_BY_SEARCH + keyWord : API.COURSE_LIST_BY_ALL;
                const response = await axios.get(`${getValue}`);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error('검색 중 오류가 발생했습니다:', error);
            }
        };

        fetchLectures();
    }, [location]);

    return (
        <>
            <ContentArea>
                <Flex flexDirection={'column'} className={'content-wrapper'} p={4} width={'100%'} gap={4}>
                    <SearchBar placeholder="검색어를 입력하세요" purpose="search" /> {/* SearchBar 컴포넌트 추가 */}
                    {searchResults.length > 0 ? (
                        <Box>
                            <ClassCardList>
                                {searchResults.map((item, idx) => (
                                    <ClassCard
                                        key={idx}
                                        title={item.title}
                                        desc={item.description}
                                        onClick={() => navigate(`/class/${item.courseId}`)}
                                        imgSrc={item.thumbnailPath}
                                    />
                                ))}
                            </ClassCardList>
                            <Box mt={250} />
                        </Box>
                    ) : (
                        <Box>
                            <Text
                                display="flex"
                                color="white"
                                justifyContent="center"
                                alignItems="center"
                                height="50vh"
                                fontSize="4xl"
                            >
                                검색 결과가 없습니다.
                            </Text>
                        </Box>
                    )}
                </Flex>
            </ContentArea>
        </>
    );
}

export default SearchPage;
