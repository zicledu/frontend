import React, { ReactNode, useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Logger from 'console-log-level';  
let log = Logger({level: 'trace'});
import {
    Box,
    Container,
    Flex,
    SimpleGrid,
    Input,
    Button,
    IconButton,
    useColorModeValue,
    background,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import axios from 'axios';
import ClassCard from '../../components/ClassCard';
import SectionTitle from '../../components/SectionTitle';
import ContentArea from '../../components/ContentArea';
import { API } from '../../../config';
import SearchBar from '../../components/SearchBar/SearchBar';


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
    // 검색 결과를 저장할 상태
    const [keyword, setKeyword] = useState<string>('');
    const [allResults, setAllResults] = useState<CourseSearchInfo[]>([]);
    const [searchParams] = useSearchParams();
    // useLocation을 활용하여 쿼리 스트링 값을 가져온다.
    const location = useLocation();

    useEffect(() => {
        // search 속성에 접근하면 쿼리 스트링 값을 얻을 수 있다.
        const keyWord = decodeURI(location.search);
        console.log('keyWord===>', keyWord)

        if (!!keyWord) {
            // 검색어가 존재하는 경우에 API 경로에 쿼리 스트링으로 전달하여 fetch한다.
            const fetchLectures = async () => {
                try {
                    const getValue = API.COURSE_LIST_BY_SEARCH + keyWord
                    console.log('getValue===>',getValue)
                    const response = await axios.get(`${getValue}`);
                    //const data = await response.json();

                    setSearchResults(response.data.data);
                    console.log(searchResults);
                } catch (error) {
                    console.error('검색 중 오류가 발생했습니다:', error);
                }
            };

            fetchLectures();
        } else {
            // 검색어가 없는 경우 전체 게시물을 fetch한다.
            const fetchLectures = async () => {
                try {
                    const response = await axios(`${API.COURSE_LIST_BY_ALL}`); // 여기 좀 헷갈리네...
                    //const data = await response.json();

                    setSearchResults(response.data.data);
                } catch (error) {
                    console.error('검색 중 오류가 발생했습니다:', error);
                }
            };

            fetchLectures();
        }
    }, [location]);

    return (
        <>
            <ContentArea>
                <Flex flexDirection={'column'} className={'content-wrapper'} p={4} width={'100%'} gap={4}>
                    <SearchBar placeholder="강의 제목을 검색해보세요" purpose="search" />
                    {/* 검색 결과를 보여줄지 여부를 조건부 렌더링으로 설정 */}
                    {searchResults.length > 0 ? (
                        <Box>
                            <SectionTitle title={'검색 결과'} />
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
                            {/* 전체 강의 목록을 보여줄 카드 리스트 */}
                            <SectionTitle title={'전체 강의'} />
                            <ClassCardList>
                                {allResults.map((item, idx) => (
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
                    )}
                </Flex>
            </ContentArea>
        </>
    );
}

export default SearchPage;
