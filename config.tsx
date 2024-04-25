// const IP_ADDRESS = import.meta.env.VITE_IP_ADDRESS || import.meta.env.GIT_IP_ADDRESS;

// const IP_ADDRESS = "13.125.189.126:8080";

const IP_ADDRESS = "https://zhl2juvik8.execute-api.ap-northeast-2.amazonaws.com/lms";

export const API = {
    COURSE_LIST_BY_BEST : `${IP_ADDRESS}/course/best`,
    COURSE_LIST_BY_NEW : `${IP_ADDRESS}/course/new`,
    COURSE_LIST_BY_USERID : `${IP_ADDRESS}/course/userId`,
    COURSE_LIST_BY_SEARCH : `${IP_ADDRESS}/course/search`,
    COURSE_LIST_BY_ALL: `${IP_ADDRESS}/course/all`,
    LOGOUT : `${IP_ADDRESS}/logout`,
    LOGIN : `${IP_ADDRESS}/login`,
    SIGNUP : `${IP_ADDRESS}/join`,
    REFRESH : `${IP_ADDRESS}/refresh`,
    CLASS_INFO : `${IP_ADDRESS}/class/info/courseId`,
    CLASS_SUMMARY : `${IP_ADDRESS}/class/summary/courseId`,
    CLASS_ENROLLMENT : `${IP_ADDRESS}/class/enrollment`,
    CLASS_CURRICULUM : `${IP_ADDRESS}/class/curriculum/courseId`,
    CLASS_INSTRUCTOR : `${IP_ADDRESS}/class/instructor/courseId`,
    UPLOAD_IMAGE : `${IP_ADDRESS}/upload/image`,
    UPLOAD_COURSE : `${IP_ADDRESS}/upload`,
    HOME : `${IP_ADDRESS}/`

    
};

