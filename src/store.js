import { create } from "zustand";

/** 선택된 사용자 상세 정보를 담는 전역 변수 */ 
export const userInfoStore = create((set, get) => ({
    userData: "",
    setUserData: (value) => {
        set({userData: value})
    },
}));
export default userInfoStore;

/** 선택된 게시글의 상세 정보를 담는 전역 변수 */ 
export const qnaPostDetail = create((set, get) => ({
    qnaPostData: "",
    setQnaPostData: (value) => {
        set({qnaPostData: value})
    },
}));

/** 로그인한 유저의 admin 여부를 담는 전역 변수 */ 
export const adminStore = create((set, get) => ({
    isAdmin: "",
    setIsAdmin: (value) => {
        set({isAdmin: value})
    },

    loginedUserId: "",
    setLoginedUserId: (value) => {
        set({loginedUserId: value})
    },
}));
