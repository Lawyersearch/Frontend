export interface WebResponseError {
  error: string;
  isCorrect: false;
  statusCode: number;
  data: null;
}

export interface WebResponseSuccess<T> {
  error: null;
  isCorrect: true;
  statusCode: number;
  data: T;
}

export type WebResponse<T> = WebResponseError | WebResponseSuccess<T>;
