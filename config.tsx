const IP_ADDRESS = import.meta.env.VITE_IP_ADDRESS || import.meta.env.GIT_IP_ADDRESS;

// const IP_ADDRESS = "13.125.189.126:8080";


export const API = {
    COURSE_LIST_BY_BEST : `${IP_ADDRESS}/course/best`,
    COURSE_LIST_BY_NEW : `${IP_ADDRESS}/course/new`,
    COURSE_LIST_BY_USERID : `${IP_ADDRESS}/course/userId`,
    COURSE_LIST_BY_SEARCH : `${IP_ADDRESS}/course`,
    LOGOUT : `${IP_ADDRESS}/logout`,
    LOGIN : `${IP_ADDRESS}/login`,
    SIGNUP : `${IP_ADDRESS}/join`,
    REFRESH : `${IP_ADDRESS}/refresh`
    
};