export interface RTKStatus {
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  isUninitialized: boolean
  error: {status: number, data: string}
}
