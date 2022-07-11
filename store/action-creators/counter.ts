import { AppDispatch } from "../index";
import { increment, decrement } from "../reducers/counterSlice";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const PlusMinus = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(increment());
      await sleep(1000);
      dispatch(increment());
      await sleep(1000);
      dispatch(increment());
      await sleep(1000);
      dispatch(decrement());
      await sleep(1000);
      dispatch(decrement());
      await sleep(1000);
      dispatch(decrement());
    } catch (e) {
      console.log(e);
    }
  };
};
