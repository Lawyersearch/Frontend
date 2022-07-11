import { Middleware, MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";
import { pushSnack } from "../store/reducers/uiSlice";
import _get from "lodash/get";
import { RTKResponse } from "../types/RTKResponse";

const rtkQueryHandler: Middleware =
  (api: MiddlewareAPI) =>
  (next) =>
  (action: PayloadAction<RTKResponse<any> & { status: number }>) => {
    const invalidRequest: boolean =
      action.type.endsWith("/rejected") ||
      !_get(action, "payload.data.isCorrect", true);
    const cached: boolean = _get(action, "meta.condition", true);
    if (invalidRequest && !cached) {
      if (action.payload?.status === 401) {
        localStorage.removeItem("token");
      } else {
        api.dispatch(
          pushSnack({
            message: _get(action, "payload.data.error", "Ошибка сети"),
            variant: "error",
          })
        );
      }
    }
    return next(action);
  };

export default rtkQueryHandler;
