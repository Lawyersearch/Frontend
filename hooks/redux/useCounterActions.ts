import { useAppDispatch } from "./useTypedRedux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as CounterActionCreators from "../../store/action-creators/counter";

export const useCounterActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(CounterActionCreators, dispatch);
};
