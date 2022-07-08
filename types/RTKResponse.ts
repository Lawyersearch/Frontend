import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { WebResponseError, WebResponseSuccess } from './webResponseBody'

export interface RTKSuccessResponse<T> {
  data: WebResponseSuccess<T>
  error: undefined
}

export interface RTKError {
  data: WebResponseError
  status: number
}

export interface RTKErrorResponse {
  data: undefined
  error: RTKError | FetchBaseQueryError | SerializedError
}

export type RTKResponse<T> = RTKSuccessResponse<T> | RTKErrorResponse
