import { atom } from "recoil";
export const userstate = atom({
    key: 'userstate', // unique ID (with respect to other atoms/selectors)
    default: ''
});