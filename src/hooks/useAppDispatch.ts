import {AppDispatch} from "../store/store.ts";
import {useDispatch} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;