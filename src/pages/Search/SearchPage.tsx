import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import ClassCard from '../../components/ClassCard';
import ContentArea from '../../components/ContentArea';
import SearchBar from '../../components/SearchBar/SearchBar'; // SearchBar 컴포넌트 import
import { API } from '../../../config';
import './SearchPageCSS.css'; // CSS 파일 import

// 검색 정보에 대한 타입 정의
type CourseSearchInfo = {
    title: string;
    description: string;
    courseId: number;
    thumbnailPath: string;
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
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 6; // Number of items per page

    useEffect(() => {
        // search 속성에 접근하면 쿼리 스트링 값을 얻을 수 있다.
        const keyWord = decodeURI(location.search);

        // 검색어가 존재하는 경우에 API 경로에 쿼리 스트링으로 전달하여 fetch한다.
        const fetchLectures = async () => {
            try {
                const getValue = keyWord ? API.COURSE_LIST_BY_SEARCH + keyWord : API.COURSE_LIST_BY_ALL;
                const response = await axios.get(`${getValue}`);
                setSearchResults(response.data.data);
                setCurrentPage(1); // 검색 시 페이지를 1페이지로 설정
            } catch (error) {
                console.error('검색 중 오류가 발생했습니다:', error);
            }
        };

        fetchLectures();
    }, [location]);

    // Calculate total pages based on the number of search results and items per page
    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    // Function to get the current page items based on the current page number
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return searchResults.slice(startIndex, endIndex);
    };

    // Function to handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Get current page items
    const currentItems = getCurrentPageItems();

    return (
        <>
            <ContentArea>
                <Flex flexDirection={'column'} className={'content-wrapper'} p={4} width={'100%'} gap={4}>
                    <SearchBar placeholder="검색어를 입력하세요" purpose="search" /> {/* SearchBar 컴포넌트 추가 */}
                    {currentItems.length > 0 ? (
                        <Box>
                            <ClassCardList>
                                {currentItems.map((item, idx) => (
                                    <ClassCard
                                        key={idx}
                                        title={item.title}
                                        desc={item.description}
                                        onClick={() => navigate(`/class/${item.courseId}`)}
                                        imgSrc={item.thumbnailPath}
                                    />
                                ))}
                            </ClassCardList>
                            {/* Pagination component */}
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
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
