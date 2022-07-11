export interface WebResponseError {
  error: string;
  isCorrect: false;
  statusCode: number;
  value: null;
}

export interface WebResponseSuccess<T> {
  error: null;
  isCorrect: true;
  statusCode: number;
  value: T;
}

export type WebResponse<T> = WebResponseError | WebResponseSuccess<T>;
