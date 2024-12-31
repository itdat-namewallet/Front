import { create } from "zustand";


const userInfoStore = create((set, get) => ({
    userData: "",
    setUserData: (value) => {
        set({userData: value})
    },
}));
export default userInfoStore;